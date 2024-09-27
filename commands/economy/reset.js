const UserProfile = require('../../schemas/UserProfile');

module.exports = {
    name: 'reset',
    description: 'resets UserProfile',
    async execute(msg, message, args, client){
        //Packages
        const Discord = require('discord.js');
        
        //Command
        var yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 2);

        try {
            let userProfile = await UserProfile.findOne({
                userId: message.author.id,
            });

            //Update the balance and last daily claim date
            var previousBalance = userProfile.balance;
            var previousDailyStreakMultiplier = userProfile.dailyStreakMultiplier;
            userProfile.balance = 0;
            userProfile.lastDailyCollected = yesterday;
            userProfile.dailyStreakMultiplier = 1.00;

            await userProfile.save();

            //Reset UserProfile
            message.reply({
                embeds: [{
                    title: "Your Data has been Reset",
                    description: "Your previous balance was: **"+previousBalance+"** <:PopflixCoin:1289329625792774155>\nYour Daily Streak Multiplier was: **"+previousDailyStreakMultiplier+"x**\nYour new balance is: **"+userProfile.balance+"** <:PopflixCoin:1289329625792774155>",
                    color: parseInt("f50000", 16)
                }]
            });

        } catch (error) {
            console.log("RESET COMMAND ERROR: "+error);
        };
    }
};