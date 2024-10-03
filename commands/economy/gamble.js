const UserProfile = require('../../schemas/UserProfile');
const PopflixStats = require('../../schemas/PopflixStats.js');
const robbery = require('./robbery.js');
const fs = require('fs');
const path = require('path');

module.exports = {
    name: 'gamble',
    description: 'gamble some money on a 50/50',
    async execute(msg, message, args, client){
        //Packages
        const Discord = require('discord.js');
        
        //Command
        //try {
            let userProfile = await UserProfile.findOne({
                userId: message.author.id,
            });

            //Check if the user doesn't have a UserProfile
            if (!userProfile) {
                userProfile = new UserProfile({
                    userId: message.author.id,
                });
            };

            //Gamble
            var amount = 0;
            var soul = false;
            let adminRole = message.guild.roles.cache.find(r => r.id === "731920530470600824");
            if ((message.content.substring(8)).toLowerCase().includes('all') && userProfile.balance > 0) {
                amount = userProfile.balance;
            } else if ((message.content.substring(8)).toLowerCase().includes('soul') && userProfile.balance === 0) {
                soul = true;
                amount = 5;
            } else {
                amount = parseInt(message.content.substring(8));
                if (isNaN(amount) || amount < 1) {
                    return message.channel.send("<@"+message.author.id+"> **[Invalid Amount]**");
                };
            };

            if (amount > userProfile.balance && soul === false) {
                return message.reply({
                    embeds: [{
                        title: "Insufficient Balance",
                        description: "Your balance is: **"+userProfile.balance+"** <:PopflixCoin:1289329625792774155>\nYou tried to gamble: **"+amount+"** <:PopflixCoin:1289329625792774155>",
                        color: parseInt("f50000", 16)
                    }]
                }).then(embedMessage => {
                    //Random Robbery Chance
                    if (userProfile.balance > 1 && Math.floor(Math.random() * 20) === 0) {
                        robbery.execute(embedMessage, message);
                    };
                });
            };

            const didWin = Math.random() > 0.5;

            if (!didWin) { //User didn't win
                if (soul === false) {
                    userProfile.balance -= amount;

                    //Save balance
                    await userProfile.save();
                } else {
                    if (message.author.id !== '412278016429785089') {
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

                        // Ensure the timeOutReplace field is initialized as an array
                        if (!popflixStats.timeOutReplace) {
                            popflixStats.timeOutReplace = [];
                        };

                        //Get end time
                        const now = new Date();
                        const soulDuration = 10;
                        now.setMinutes(now.getMinutes() + soulDuration);
                        const soulDurationTime = now.toLocaleString()

                        //Determin if member is an Admin
                        var isAdmin = false;
                        const adminIDs = fs.readFileSync(path.join(__dirname, '..', '..', 'adminIDs.txt'), 'utf8');
                        if (adminIDs.includes(message.author.id)) { //soullessMember is an Admin
                            isAdmin = true;
                        };
                        
                        //Add the member to the timeOutReplace list
                        popflixStats.timeOutReplace.push({
                            id: message.author.id,
                            time: soulDurationTime,
                            adminCheck: isAdmin
                        });

                        await popflixStats.save();

                        //Remove Admin and Time Out
                        message.member.roles.remove('731920530470600824');
                        setTimeout(() => {
                            message.member.timeout(soulDuration * 60_000, 'Gambled soul and lost 💀');
                        }, 100);
                        
                        //Notify user
                        return message.reply({
                            embeds: [{
                                title: "❌ YOU LOST ❌",
                                description: "You tried to gamble: **YOUR SOUL**\nYour new balance is: **"+userProfile.balance+"** <:PopflixCoin:1289329625792774155>",
                                color: parseInt("f50000", 16)
                            }]
                        });
                    };
                };

                //Notify user
                if (userProfile.balance === 1) {
                    return message.reply({
                        embeds: [{
                            title: "❌ YOU LOST ❌",
                            description: "You tried to gamble: **"+amount+"** <:PopflixCoin:1289329625792774155>\nYour new balance is: **"+userProfile.balance+"** <:PopflixCoin:1289329625792774155>",
                            image: {
                                url: "https://i0.wp.com/i.redd.it/r6mr2lmr1mx71.jpg?resize=1810%2C2560&ssl=1"
                            },
                            color: parseInt("f50000", 16)
                        }]
                    }).then(embedMessage => {
                        //Random Robbery Chance
                        if (userProfile.balance > 1 && Math.floor(Math.random() * 20) === 0) {
                            robbery.execute(embedMessage, message);
                        };
                    });
                } else {
                    return message.reply({
                        embeds: [{
                            title: "❌ YOU LOST ❌",
                            description: "You tried to gamble: **"+amount+"** <:PopflixCoin:1289329625792774155>\nYour new balance is: **"+userProfile.balance+"** <:PopflixCoin:1289329625792774155>",
                            color: parseInt("f50000", 16)
                        }]
                    }).then(embedMessage => {
                        //Random Robbery Chance
                        if (userProfile.balance > 1 && Math.floor(Math.random() * 20) === 0) {
                            robbery.execute(embedMessage, message);
                        };
                    });
                };
            } else { //User won
                const amountWon = amount + Number((amount * (Math.random() * 0.35)).toFixed(0));
                userProfile.balance += amountWon;

                //Save balance
                await userProfile.save();
                
                //Notify user
                return message.reply({
                    embeds: [{
                        title: "🎉 YOU WON 🎉",
                        description: "You won: **"+amountWon+"** <:PopflixCoin:1289329625792774155>\nYour new balance is: **"+userProfile.balance+"** <:PopflixCoin:1289329625792774155>",
                        color: parseInt("00f53d", 16)
                    }]
                }).then(embedMessage => {
                    //Random Robbery Chance
                    if (userProfile.balance > 1 && Math.floor(Math.random() * 20) === 0) {
                        robbery.execute(embedMessage, message);
                    };
                });
            };

        //} catch (error) {
        //    console.log("GAMBLE COMMAND ERROR: "+error);
        //};
    }
};