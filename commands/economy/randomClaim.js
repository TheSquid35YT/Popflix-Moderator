const UserProfile = require('../../schemas/UserProfile');

const amount = 50;

module.exports = {
    name: 'randomClaim',
    description: 'reacts with a PopflixCoin. If reacted with, claim money.',
    async execute(message){
        //Packages
        const Discord = require('discord.js');
        
        //Command
        try {
            //React
            message.react('<:PopflixCoin:1289329625792774155>');

            var claimed = false;
            let filter = (reaction, user) => reaction.emoji.name === '<:PopflixCoin:1289329625792774155>';
            let collector = message.createReactionCollector(filter);

            collector.on('collect', async (reaction, user) => {
                if (claimed == false && user.id !== '777270048288407593') {
                    claimed = true;
                    
                    let userProfile = await UserProfile.findOne({
                        userId: user.id,
                    });

                    //Check if the user doesn't have a UserProfile
                    if (!userProfile) {
                        userProfile = new UserProfile({
                            userId: user.id,
                        });
                    };

                    userProfile.balance += amount;

                    await userProfile.save();

                    return message.channel.send("<@"+user.id+"> has **CLAIMED "+amount+"** <:PopflixCoin:1289329625792774155>");
                };
            });
        } catch (error) {
            console.log("RANDOMCLAIM COMMAND ERROR: "+error);
        };
    }
};