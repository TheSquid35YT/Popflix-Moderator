const UserProfile = require('../schemas/UserProfile');
const PopflixStats = require('../schemas/PopflixStats.js');

module.exports = {
    name: 'noGifThursday',
    description: 'facilitate No Gif Thursday',
    async execute(message, client){
        //Packages
        const Discord = require('discord.js');
        
        //Command
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

        //Get day
        var d = new Date();
        var options = { weekday: 'long', timeZone: 'CST' };
        var weekday = new Intl.DateTimeFormat('en-US', options).format(d);

        //Check Thursday
        if (weekday == "Thursday") { //No Gif Thursday
            //Check for Gif
            const isLink = new RegExp(/https?:\/\/\S+/g).test(message.content);
            const gifWeb = (message.content.toLowerCase().includes("tenor.com/view/") || message.content.toLowerCase().includes(".gif") || message.content.toLowerCase().includes("imgur.com/"));
            var gitFile = false;
            if (message.attachments.size > 0) {
                message.attachments.forEach(attachment => {
                    if (attachment.contentType === 'image/gif' || attachment.name.endsWith('.gif')) {
                        gifFile = true;
                    };
                });
            };

            if ((isLink && gifWeb) == true || (gitFile == true)) { //A Gif was posted, add to losers
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
    }
};