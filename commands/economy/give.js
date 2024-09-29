const UserProfile = require('../../schemas/UserProfile');

module.exports = {
    name: 'give',
    description: 'give money to another person',
    async execute(msg, message, args, client){
        //Packages
        const Discord = require('discord.js');

        //No Self-Gifting
        if (message.author.id === message.mentions.members.first().id || message.mentions.members.first() === null) {
            return message.channel.send("<@"+message.author.id+"> **[Invalid Recipient]**");
        };
        
        //Command
        try {
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
            });
        } catch (error) {
            console.log("GIVE COMMAND ERROR: "+error);
        };
    }
};