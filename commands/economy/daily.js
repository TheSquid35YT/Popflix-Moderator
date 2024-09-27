const UserProfile = require('../../schemas/UserProfile');

const dailyAmount = 500;

module.exports = {
    name: 'daily',
    description: 'claims a daily reward',
    async execute(msg, message, args, client){
        //Packages
        const Discord = require('discord.js');
        
        //Command
        try {
            let userProfile = await UserProfile.findOne({
                userId: message.author.id,
            });

            //Check if the user has a UserProfile
            if (userProfile) {
                const lastDailyDate = userProfile.lastDailyCollected?.toDateString();
                const currentDate = new Date().toDateString();

                if (lastDailyDate === currentDate) {
                    message.reply("You have already claimed your Daily Reward!");
                    return;
                };
            } else {
                userProfile = new UserProfile({
                    userId: message.author.id,
                });
            };

            //Check dailyStreakMultiplier
            var yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            if (userProfile.lastDailyCollected === yesterday) {
                //Increase dailyStreakMultiplier
                userProfile.dailyStreakMultiplier += 0.01;
            };

            //Update the balance and last daily claim date
            userProfile.balance += Math.ceil(dailyAmount * userProfile.dailyStreakMultiplier);
            userProfile.lastDailyCollected = new Date();

            await userProfile.save();

            //Claim Daily Reward
            message.reply({
                embeds: [{
                    title: "Claimed "+(Math.ceil(dailyAmount * userProfile.dailyStreakMultiplier))+" <:PopflixCoin:1289329625792774155>",
                    description: "Your new balance is: **"+userProfile.balance+"** <:PopflixCoin:1289329625792774155>\nYour Daily Streak Multiplier is: **"+userProfile.dailyStreakMultiplier+"x**",
                    color: parseInt("00f53d", 16)
                }]
            });

        } catch (error) {
            console.log("DAILY COMMAND ERROR: "+error);
        };
    }
};