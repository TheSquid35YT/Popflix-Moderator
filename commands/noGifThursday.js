const UserProfile = require('../schemas/UserProfile');
const PopflixStats = require('../schemas/PopflixStats.js');

module.exports = {
    name: 'noGifThursday',
    description: 'facilitate No Gif Thursday',
    async execute(readOrWrite, message, client) {
        //Packages
        const Discord = require('discord.js');
        const { EmbedBuilder } = require('discord.js');
        const { AttachmentBuilder } = require('discord.js');
        
        //Command
        try {
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

            if (readOrWrite === 'WRITE') {
                //Get day
                var d = new Date();
                var options = { weekday: 'long', timeZone: 'CST' };
                var weekday = new Intl.DateTimeFormat('en-US', options).format(d);

                //Check Thursday
                if (weekday == "Thursday") { //No Gif Thursday
                    //Check for Gif
                    const isLink = new RegExp(/https?:\/\/\S+/g).test(message.content);
                    const gifWeb = (message.content.toLowerCase().includes("tenor.com/view/") || message.content.toLowerCase().includes(".gif") || message.content.toLowerCase().includes("imgur.com/"));
                    const animatedEmoji = (message.content.toLowerCase().includes("<a:") && message.content.toLowerCase().includes(">"));
                    var gifFile = false;
                    if (message.attachments.size > 0) { //Check if the message contains gif files
                        message.attachments.forEach(attachment => {
                            if (attachment.contentType === 'image/gif' || attachment.name.endsWith('.gif')) {
                                gifFile = true;
                            };
                        });
                    };
                    var animatedSticker = false;
                    if (message.stickers.size > 0) { //Check if the message contains animated stickers
                        message.stickers.forEach(sticker => {
                            if (sticker.format === 2 || sticker.format === 3) {
                                animatedSticker = true;
                            };
                        });
                    };

                    if ((isLink && gifWeb) == true || (gifFile == true) || animatedEmoji == true || animatedSticker == true) { //A Gif was posted, add to losers
                        if (popflixStats.noGifThursday.losers.indexOf(message.author.id) === -1) {
                            popflixStats.noGifThursday.losers.push(message.author.id);
                            if (popflixStats.noGifThursday.contenders.indexOf(message.author.id) !== -1) { //Remove from contender list
                                popflixStats.noGifThursday.contenders.splice(popflixStats.noGifThursday.contenders.indexOf(message.author.id), 1);
                            };
                        };
                    } else { //A regular message was posted, add to contenders
                        if (popflixStats.noGifThursday.losers.indexOf(message.author.id) === -1 && popflixStats.noGifThursday.contenders.indexOf(message.author.id) === -1) {
                            popflixStats.noGifThursday.contenders.push(message.author.id);
                        };
                    };

                    //Save Stats
                    await popflixStats.save();
                };
            } else if (readOrWrite === 'READ') {
                //#reminder in Popflix and Chilly V2
                const reminderChannel = client.channels.cache.get('731713435506704424');
                
                //Get day
                var d = new Date();
                var options = { weekday: 'long', timeZone: 'CST' };
                var weekday = new Intl.DateTimeFormat('en-US', options).format(d);

                if ((weekday === "Friday") && (popflixStats.noGifThursday.midnightCheck === false)) { //Show No Gif Thursday Results //FRIDAY - FALSE
                    //Get Contenders & Losers
                    var contenders = "";
                    var spacing = 0;
                    popflixStats.noGifThursday.contenders.forEach(async contender => {
                        if (spacing < 3) {
                            contenders += ("<@"+contender+">\t");
                            spacing += 1;
                        } else {
                            contenders += ("\n<@"+contender+">\t");
                            spacing = 1;
                        };
                    });
                    var losers = "";
                    spacing = 0;
                    popflixStats.noGifThursday.losers.forEach(async loser => {
                        if (spacing < 3) {
                            losers += ("<@"+loser+">\t");
                            spacing += 1;
                        } else {
                            losers += ("\n<@"+loser+">\t");
                            spacing = 1;
                        };
                    });

                    const embedText = "__**Contenders:**__\n"+contenders+"\n\n__**Losers:**__\n"+losers;
                    const randomWheel = require('./randomWheel.js');
                    /*const attachment = */await randomWheel.execute(client, embedText);
                    //const attachment = new AttachmentBuilder(randomWheel.execute(message, client), { name: 'wheel.gif' });

                    //Send the Channel Message
                    /*const embed = await reminderChannel.send({
                        embeds: [{
                            title: "NO GIF THURSDAY",
                            description: "__**Contenders:**__\n"+contenders+"\n\n__**Losers:**__\n"+losers,
                            color: parseInt("00f5d8", 16)
                        }]
                    });*/

                    /*const embedMessage = await reminderChannel.send({
                        embeds: [
                            new EmbedBuilder()
                                .setTitle("NO GIF THURSDAY")
                                .setDescription(`__**Contenders:**__\n${contenders}\n\n__**Losers:**__\n${losers}`)
                                .setColor(parseInt("00f5d8", 16))
                        ]
                    });*/


                    //Display the random wheel
                    /*if (attachment) {
                        // Now you can send the attachment in a message
                        await reminderChannel.send({ files: [attachment] });
                    } else {
                        console.error('Failed to generate attachment');
                    };*/
                    //await embedMessage.reply({ files: [attachment] });
                    //embed.reply({ files: [attachment] });

                    //Finish midnightCheck
                    popflixStats.noGifThursday.contenders = [];
                    popflixStats.noGifThursday.losers = [];
                    popflixStats.noGifThursday.midnightCheck = true;
                } else if (weekday !== "Friday") { //Reset midnightCheck
                    popflixStats.noGifThursday.midnightCheck = false;
                };

                //Save midnightCheck
                await popflixStats.save();
            };
        } catch (error) {
            console.log("NOGIFTHURSDAY COMMAND ERROR: "+error);
        };
    }
};