const UserProfile = require('../schemas/UserProfile');
const PopflixStats = require('../schemas/PopflixStats.js');

module.exports = {
    name: 'noGifThursday',
    description: 'facilitate No Gif Thursday',
    async execute(readOrWrite, message, client) {
        //Packages
        const Discord = require('discord.js');
        
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

                if ((weekday === "Friday") && (popflixStats.noGifThursday.midnightCheck === false)) { //Show No Gif Thursday Results
                    //Get Contenders & Losers
                    var contenders = "";
                    popflixStats.noGifThursday.contenders.forEach(async contender => {
                        contenders += ("\n<@"+contender+">");
                    });
                    var losers = "";
                    popflixStats.noGifThursday.losers.forEach(async loser => {
                        losers += ("\n<@"+loser+">");
                    });

                    //Send the Channel Message
                    reminderChannel.send({
                        embeds: [{
                            title: "NO GIF THURSDAY",
                            description: "__**Contenders:**__"+contenders+"\n\n__**Losers:**__"+losers,
                            color: parseInt("00f5d8", 16)
                        }]
                    });

                    //Finish midnightCheck
                    popflixStats.noGifThursday.contenders = [];
                    popflixStats.noGifThursday.losers = [];
                    popflixStats.noGifThursday.midnightCheck = true;
                } else { //Reset midnightCheck
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