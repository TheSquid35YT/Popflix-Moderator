const UserProfile = require('../../schemas/UserProfile');

module.exports = {
    name: 'robbery',
    description: 'reacts with a money bag emoji. If reacted with, steal money.',
    async execute(embedMessage, message){
        //Packages
        const Discord = require('discord.js');
        
        //Command
        try {
            //React
            embedMessage.react('💰');

            var claimed = false;
            let filter = (reaction, user) => reaction.emoji.name === '💰';
            let collector = embedMessage.createReactionCollector(filter);

            collector.on('collect', async (reaction, user) => {
                if (claimed == false && user.id !== '777270048288407593') {
                    claimed = true;
                    
                    if (user.id !== message.author.id) {
                        let userProfileOwner = await UserProfile.findOne({
                            userId: message.author.id,
                        });
        
                        let userProfileReceiver = await UserProfile.findOne({
                            userId: user.id,
                        });

                        //Check if the user doesn't have a UserProfile
                        if (!userProfileOwner) {
                            userProfileOwner = new UserProfile({
                                userId: message.author.id,
                            });
                        };

                        if (!userProfileReceiver) {
                            userProfileReceiver = new UserProfile({
                                userId: user.id,
                            });
                        };

                        const amount = Math.ceil(userProfileOwner.balance * 0.1);
                        userProfileOwner.balance -= amount;
                        userProfileReceiver.balance += amount;

                        await userProfileOwner.save();
                        await userProfileReceiver.save();

                        return message.channel.send("<@"+user.id+"> has **STOLEN "+amount+"** <:PopflixCoin:1289329625792774155> from <@"+message.author.id+">");
                    } else {
                        return;
                    };
                };
            });
        } catch (error) {
            console.log("ROBBERY COMMAND ERROR: "+error);
        };
    }
};