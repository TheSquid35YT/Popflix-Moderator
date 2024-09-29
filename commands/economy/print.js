const UserProfile = require('../../schemas/UserProfile');

module.exports = {
    name: 'print',
    description: 'inflation',
    async execute(msg, message, args, client){
        //Packages
        const Discord = require('discord.js');
        
        //Command
        try { 
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
            const amount = parseInt(message.content.substring(7));
            if (isNaN(amount) || amount < 1) {
                return message.channel.send("<@"+message.author.id+"> **[Invalid Amount]**");
            };

            //Update the balance and last daily claim date
            userProfile.balance += amount;

            await userProfile.save();

            //Claim Daily Reward
            message.reply({
                embeds: [{
                    title: "Increased Inflation",
                    description: "Your new balance is: **"+userProfile.balance+"** <:PopflixCoin:1289329625792774155>",
                    color: parseInt("00f53d", 16)
                }]
            });

        } catch (error) {
            console.log("PRINT COMMAND ERROR: "+error);
        };
    }
};