const UserProfile = require('../../schemas/UserProfile');
const robbery = require('./robbery.js');

module.exports = {
    name: 'give',
    description: 'give money to another person',
    async execute(msg, message, args, client){
        //Packages
        const Discord = require('discord.js');
        
        //Command
        if ((msg.startsWith('!give <@') || msg.startsWith('!gift <@')) && !(msg.startsWith('!give <@&') || msg.startsWith('!gift <@&'))) {
            try {
                //No Self-Gifting
                if (message.author.id === message.mentions.members.first().id) {
                    return message.channel.send("<@"+message.author.id+"> **[Invalid Recipient]**");
                };

                let userProfileOwner = await UserProfile.findOne({
                    userId: message.author.id,
                });

                let userProfileReceiver = await UserProfile.findOne({
                    userId: message.mentions.members.first().id,
                });

                //Check if the user doesn't have a UserProfile
                if (!userProfileOwner) {
                    userProfileOwner = new UserProfile({
                        userId: message.author.id,
                    });
                };

                if (!userProfileReceiver) {
                    userProfileReceiver = new UserProfile({
                        userId: message.mentions.members.first().id,
                    });
                };

                //Gift
                const amount = parseInt(message.content.substring(message.content.indexOf(">") + 1));
                if (isNaN(amount) || amount < 1) {
                    return message.channel.send("<@"+message.author.id+"> **[Invalid Amount]**");
                };

                if (amount > userProfileOwner.balance) {
                    return message.reply({
                        embeds: [{
                            title: "Insufficient Balance",
                            description: "Your balance is: **"+userProfileOwner.balance+"** <:PopflixCoin:1289329625792774155>\nYou tried to give: **"+amount+"** <:PopflixCoin:1289329625792774155> to <@"+(message.mentions.members.first().id)+">",
                            color: parseInt("f50000", 16)
                        }]
                    }).then(embedMessage => {
                        //Random Robbery Chance
                        if (userProfileOwner.balance > 1 && Math.floor(Math.random() * 20) === 0) {
                            robbery.execute(embedMessage, message);
                        };
                    });
                };

                //Give the amount
                userProfileOwner.balance -= amount;
                userProfileReceiver.balance += amount;

                //Save balance
                await userProfileOwner.save();
                await userProfileReceiver.save();

                //Notify user
                return message.reply({
                    embeds: [{
                        title: "Successful Transfer",
                        description: "You gave: **"+amount+"** <:PopflixCoin:1289329625792774155> to <@"+(message.mentions.members.first().id)+">\nYour new balance is: **"+userProfileOwner.balance+"** <:PopflixCoin:1289329625792774155>\n<@"+(message.mentions.members.first().id)+">\'s new balance is: **"+userProfileReceiver.balance+"** <:PopflixCoin:1289329625792774155>",
                        color: parseInt("00f53d", 16)
                    }]
                }).then(embedMessage => {
                    //Random Robbery Chance
                    if (userProfileOwner.balance > 1 && Math.floor(Math.random() * 20) === 0) {
                        robbery.execute(embedMessage, message);
                    };
                });
            } catch (error) {
                console.log("GIVE COMMAND ERROR: "+error);
            };
        } else {
            message.channel.send("<@"+message.author.id+"> **[Invalid Recipient]**");
        };
    }
};