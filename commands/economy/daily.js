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
            
            //Date Format Options (CST)
            var options = { year: 'numeric', month: '2-digit', day: '2-digit', timeZone: 'CST' };

            //Check if the user has a UserProfile
            if (userProfile) {
                const lastDailyDate = userProfile.lastDailyCollected?.toDateString();
                const currentDate = new Date().toDateString();

                if (new Intl.DateTimeFormat('en-US', options).format(new Date(lastDailyDate)) === new Intl.DateTimeFormat('en-US', options).format(new Date(currentDate))) {
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
            yesterday = new Intl.DateTimeFormat('en-US', options).format(yesterday);

            if (new Intl.DateTimeFormat('en-US', options).format(userProfile.lastDailyCollected) === yesterday) {
                //Increase dailyStreakMultiplier
                userProfile.dailyStreakMultiplier += 1;
            } else {
                userProfile.dailyStreakMultiplier = 100;
            };

            //Update the balance and last daily claim date
            const streakMultiplier = (userProfile.dailyStreakMultiplier/100);
            userProfile.balance += Math.ceil(dailyAmount * streakMultiplier);
            userProfile.lastDailyCollected = new Date();

            await userProfile.save();

            userProfile.dailyStreakMultiplier = 103;

            //Claim Daily Reward
            message.reply({
                embeds: [{
                    title: "Claimed "+(Math.ceil(dailyAmount * streakMultiplier))+" <:PopflixCoin:1289329625792774155>",
                    description: "Your new balance is: **"+userProfile.balance+"** <:PopflixCoin:1289329625792774155>\nYour Daily Streak Multiplier is: **"+streakMultiplier+"x**",
                    color: parseInt("00f53d", 16)
                }]
            });

        } catch (error) {
            console.log("DAILY COMMAND ERROR: "+error);
        };
    }
};