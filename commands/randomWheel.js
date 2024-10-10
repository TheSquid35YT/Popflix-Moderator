const UserProfile = require('../schemas/UserProfile');
const PopflixStats = require('../schemas/PopflixStats.js');

//const Discord = require('discord.js');
const { AttachmentBuilder } = require('discord.js');
const { createCanvas } = require('canvas');
const { loadImage } = require('canvas');
const GIFEncoder = require('gifencoder');

module.exports = {
    name: 'randomWheel',
    description: 'creates a random wheel animation for the No Gif Thursday Winner',
    async execute(client, embedText) {
        //Packages
        const Discord = require('discord.js');
        const { EmbedBuilder } = require('discord.js');
        
        
        //Command
        async function createFrames() { //Create the frames and add them to the gif
            //Get contenders
            let popflixStats = await PopflixStats.findOne({
                dataBaseID: 'POPFLIX',
            });

            //Check if the popflixStats doesn't exist
            if (!popflixStats) {
                popflixStats = new PopflixStats({
                    dataBaseID: 'POPFLIX',
                    timeOutReplace: [],
                    noGifThursday: new Object
                });
            };

            //Add the contenders to the array
            var textArray = popflixStats.noGifThursday.contenders; // Text for each segment
            for (let i = 0; i < textArray.length; i += 1) {
                textArray[i] = (await client.users.fetch(textArray[i])).username;
            };

            for (let i1 = textArray.length - 1; i1 >= 0; i1 -= 1) {
                const i2 = Math.floor(Math.random() * (i1 + 1));
                [textArray[i1], textArray[i2]] = [textArray[i2], textArray[i1]]; //Swap the values
            };
                
            //Initialize the wheel variables
            const segments = textArray.length;
            const frames = 360;
            const speed = 20;

            const centerImage = await loadImage(`${__dirname}/../PopflixLogo.png`);

            const encoder = new GIFEncoder(400, 400);
            
            //Begin encoding the gif
            encoder.start();
            encoder.setRepeat(-1);      //0 for repeat, -1 for no-repeat
            encoder.setDelay(speed);    //Frame delay in ms
            encoder.setQuality(1);      //Image quality. 10 is default. 1 is best.
            
            const canvas = createCanvas(400, 400);
            const ctx = canvas.getContext('2d');
            
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            const radius = 150;
            var totalRotation = 0;

            const segmentAngle = (2 * Math.PI / segments);

            //Draw the segments of the wheel and rotate it
            for (let frame = 0; frame < frames; frame += 1) {
                const initialSpeed = Math.floor((Math.random() * 10) + 15); //Degrees
                var rotationAngle = initialSpeed;
                rotationAngle = initialSpeed * (1 - Math.pow((frame / frames), 2));
                totalRotation += rotationAngle;
                drawWheel(canvas, ctx, encoder, textArray, centerX, centerY, radius, totalRotation, rotationAngle, initialSpeed, segments, segmentAngle, frame, frames, centerImage);
            };

            //Normalize total rotation to a value between 0 and 360 degrees
            const finalRotation = totalRotation % 360;

            //Calculate the angle per segment in degrees
            const segmentAngleInDegrees = 360 / segments;

            var winner = '';

            //Check winner
            for (let currentIndex = 0; currentIndex < textArray.length; currentIndex += 1) {
                const leftBound = (((currentIndex * segmentAngleInDegrees) + finalRotation) % 360);
                const rightBound = (((currentIndex * segmentAngleInDegrees) + 40 + finalRotation) % 360);

                if (leftBound > rightBound) {
                    //Wrapped segment check
                    if (0 >= leftBound || 0 < rightBound) {
                        winner = textArray[currentIndex];
                        break;
                    };
                    break;
                } else {
                    //Regular segment check (no wrapping)
                    if (0 >= leftBound && 0 < rightBound) {
                        winner = textArray[currentIndex];
                        break;
                    };
                };
            };

            //Show the winner on the gif
            ctx.restore();

            // Draw the winner's name in the last frame
            ctx.fillStyle = 'white';
            ctx.font = '30px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(`Winner: ${winner}`, centerX, 35); // Add winner label
            encoder.addFrame(ctx);

            //Finish the gif
            encoder.finish();

            //Return the gif
            return encoder.out.getData();
        };

        async function drawWheel(canvas, ctx, encoder, textArray, centerX, centerY, radius, totalRotation, rotationAngle, initialSpeed, segments, segmentAngle, frame, frames, centerImage) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.save();

            //Set background color
            const backgroundColor = '#313338';
            ctx.save();
            ctx.fillStyle = backgroundColor; //Set the background color
            ctx.fillRect(0, 0, canvas.width, canvas.height); //Fill the entire canvas with the background color
            ctx.restore();

            ctx.beginPath();
            ctx.translate(centerX, centerY);

            //Rotate the canvas
            ctx.rotate((totalRotation * Math.PI) / 180);
            for (let i = 0; i < segments; i++) {
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.arc(0, 0, radius, i * segmentAngle, (i + 1) * segmentAngle);
                ctx.lineTo(0, 0);

                //Fill with different colors
                ctx.fillStyle = `hsl(${i * (360 / segments)}, 100%, 42.5%)`; 
                ctx.fill();

                //Add text to the rotating segment
                ctx.save(); // Save the context state
                const textRotationAngle = (i + 0.5) * segmentAngle; // Rotate to the middle of the segment
                ctx.rotate(textRotationAngle); // Rotate text to align with the segment

                //Draw the text in the middle of the segment
                //ctx.fillStyle = 'white';
                ctx.fillStyle = 'black';
                let fontSize = 20; // Start with a base font size
                ctx.font = `${fontSize}px Arial`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';

                //Measure the text width and shrink font size if necessary
                const text = textArray[i];
                let textWidth = ctx.measureText(text).width;
                const maxTextWidth = ((radius * 5) / 7) * 0.8; // Set a maximum width for text to fit inside the segment

                //Shrink the font size if the text is too wide for the segment
                while (textWidth > maxTextWidth && fontSize > 10) { // Ensure the font doesn't get too small
                    fontSize -= 1;
                    ctx.font = `${fontSize}px Arial`;
                    textWidth = ctx.measureText(text).width;
                };

                const textX = (radius * 4.25) / 7; //Position the text halfway through the segment
                const textY = 0; //Keep the text centered vertically
                ctx.fillText(textArray[i], textX, textY); //Add the text for the segment

                ctx.restore(); //Restore the previous state
            };

            ctx.restore(); //Restore the previous state

            //Draw the static center circle
            ctx.beginPath();
            ctx.arc(centerX, centerY, 35, 0, 2 * Math.PI);
            ctx.fillStyle = '#A8AFBF';
            ctx.fill();

            //Draw the center image inside the circle
            const imageOffset = 30;
            const imageSize = imageOffset * 2; // Set the size of the image to fit the circle
            ctx.drawImage(centerImage, centerX - imageOffset, centerY - imageOffset, imageSize, imageSize);

            //Draw the static triangle for winning
            // After the wheel segments are drawn and before the frame is added, add the indicator
            const triangleSize = 20; // Customize the size of the triangle
            const triangleOffset = radius - 10; // Slightly outside the wheel's radius

            ctx.save();
            ctx.fillStyle = 'black'; // Color for the triangle (you can change this)
            ctx.translate(centerX, centerY); // Move origin to center

            // Draw the triangle pointing to the right (0 degrees)
            ctx.beginPath();
            ctx.moveTo(triangleOffset, 0); // Starting point (right of the wheel)
            ctx.lineTo(triangleOffset + triangleSize, -triangleSize / 2); // Top point
            ctx.lineTo(triangleOffset + triangleSize, triangleSize / 2); // Bottom point
            ctx.closePath();
            ctx.fill(); // Fill the triangle with color

            ctx.restore();
            encoder.addFrame(ctx);
        };
        
        async function createSpinningWheelGif() { //Convert the gif to a discord attachment
            try {
                //#reminder in Popflix and Chilly V2
                const reminderChannel = client.channels.cache.get('731713435506704424');

                //Create the gif
                const gifBuffer = await createFrames();
                const attachment = new AttachmentBuilder(gifBuffer, { name: 'wheel.gif' });
                
                //Send the embed and GIF in the same message
                await reminderChannel.send({
                    embeds: [
                        new EmbedBuilder()
                            .setTitle("NO GIF THURSDAY")
                            .setDescription(embedText)
                            .setColor(parseInt("00f5d8", 16))
                            .setImage('attachment://wheel.gif') // Reference the attached gif in the embed
                    ],
                    files: [attachment] // Attach the GIF here*/
                });
            } catch (error) {
                console.error('Error creating GIF:', error);
            };
        };

        //Create the gif
        await createSpinningWheelGif();
    }
};