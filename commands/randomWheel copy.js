const UserProfile = require('../schemas/UserProfile');
const PopflixStats = require('../schemas/PopflixStats.js');

//const Discord = require('discord.js');
const { createCanvas } = require('canvas');
const { AttachmentBuilder } = require('discord.js');

module.exports = {
    name: 'randomWheelCOPY',
    description: 'creates a random wheel animation for the No Gif Thursday Winner',
    async execute(message, client) {
        //Packages
        const Discord = require('discord.js');
        
        //Command
        // Create canvas and draw
        const canvas = createCanvas(800, 600);
        const ctx = canvas.getContext('2d');

        // Example drawing
        ctx.fillStyle = 'blue';
        ctx.fillRect(0, 0, 800, 600);
        ctx.fillStyle = 'white';
        ctx.font = '30px Arial';
        ctx.fillText('Hello World!', 50, 100);

        // Convert canvas to buffer
        const buffer = canvas.toBuffer('image/png');

        // Send the image as an attachment
        //const attachment = new MessageAttachment(buffer, 'wheel.png');
        const attachment = new AttachmentBuilder(buffer, { name: 'image.png' });
        message.channel.send({ files: [attachment] });
    }
};