const UserProfile = require('../../schemas/UserProfile');

module.exports = {
    name: 'slots',
    description: 'gamble some money in a Slot Machine',
    async execute(msg, message, args, client){
        //Packages
        const Discord = require('discord.js');
        
        //Command
        const g1 = ['<a:11:1289859395357769739>', '<a:bleach:1289859414072754236>', '<a:emoji_28:1289859425359761409>', '<a:emoji_50:1289859438634598492>', '<a:mason:1289859451054067774>'];
        const groups = [g1];

        const slot = await message.reply({
            embeds: [{
                title: "🎰 SLOTS 🎰",
                description: "⌞ <a:Slots_1_2:1289820548087418961> <a:Slots_1_2:1289851677352136724> <a:Slots_1_3:1289851718393139252> ⌟"
            }]
        });

        slot.edit({
            embeds: [{
                title: "🎰 SLOTS 🎰",
                description: "⌞ <a:Slots_1_2:1289820548087418961> <a:Slots_1_2:1289851677352136724> <a:Slots_1_3:1289851718393139252> ⌟"
            }]
        });

        setTimeout(() => {
            slot.edit({
                embeds: [{
                    title: "🎰 SLOTS 🎰",
                    description: "⌞ O <a:Slots_1_2:1289851677352136724> <a:Slots_1_3:1289851718393139252> ⌟"
                }]
            });

            setTimeout(() => {
                slot.edit({
                    embeds: [{
                        title: "🎰 SLOTS 🎰",
                        description: "⌞ O O <a:Slots_1_3:1289851718393139252> ⌟"
                    }]
                });
                setTimeout(() => {
                    slot.edit({
                        embeds: [{
                            title: "🎰 SLOTS 🎰",
                            description: "⌞ O O O ⌟"
                        }]
                    });
                }, "1500");
            }, "2000");
        }, "3000");

        /*try {
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
            if ((message.content.substring(8)).toLowerCase().includes('all') && userProfile.balance > 0) {
                amount = userProfile.balance;
            } else {
                amount = parseInt(message.content.substring(8));
                if (isNaN(amount) || amount < 1) {
                    return message.channel.send("<@"+message.author.id+"> **[Invalid Amount]**");
                };
            };

            if (amount > userProfile.balance) {
                return message.reply({
                    embeds: [{
                        title: "Insufficient Balance",
                        description: "Your balance is: **"+userProfile.balance+"** <:PopflixCoin:1289329625792774155>\nYou tried to gamble: **"+amount+"** <:PopflixCoin:1289329625792774155>",
                        color: parseInt("f50000", 16)
                    }]
                });
            };

            const didWin = Math.random() > 0.5;

            if (!didWin) { //User didn't win
                userProfile.balance -= amount;

                //Save balance
                await userProfile.save();

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
                    });
                } else {
                    return message.reply({
                        embeds: [{
                            title: "❌ YOU LOST ❌",
                            description: "You tried to gamble: **"+amount+"** <:PopflixCoin:1289329625792774155>\nYour new balance is: **"+userProfile.balance+"** <:PopflixCoin:1289329625792774155>",
                            color: parseInt("f50000", 16)
                        }]
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
                });
            };

        } catch (error) {
            console.log("SLOTS COMMAND ERROR: "+error);
        };*/
    }
};