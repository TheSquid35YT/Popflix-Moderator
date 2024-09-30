const UserProfile = require('../../schemas/UserProfile');

module.exports = {
    name: 'blackjack',
    description: 'gamble some money in a game of Blackjack',
    async execute(msg, message, args, client){
        //Packages
        const Discord = require('discord.js');
        
        //Command
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
            console.log("GAMBLE COMMAND ERROR: "+error);
        };*/
    }
};