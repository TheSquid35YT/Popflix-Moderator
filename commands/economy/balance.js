const UserProfile = require('../../schemas/UserProfile');

module.exports = {
    name: 'balance',
    description: 'returns the balance of a user',
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

            //Return the balance
            message.reply({
                embeds: [{
                    title: message.author.username+"\'s Balance",
                    description: "Your balance is: **"+userProfile.balance+"** <:PopflixCoin:1289329625792774155>\nYour Daily Streak Multiplier is: **"+userProfile.dailyStreakMultiplier+"x**",
                    color: parseInt("00f5d8", 16)
                }]
            });

        } catch (error) {
            console.log("BALANCE COMMAND ERROR: "+error);
        };
    }
};