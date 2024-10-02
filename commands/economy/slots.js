const UserProfile = require('../../schemas/UserProfile');
const robbery = require('./robbery.js');

module.exports = {
    name: 'slots',
    description: 'gamble some money in a Slot Machine',
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
            var amount = 0;
            if ((message.content.substring(7)).toLowerCase().includes('all') && userProfile.balance > 0) {
                amount = userProfile.balance;
            } else {
                amount = parseInt(message.content.substring(7));
                if (isNaN(amount) || amount < 100) {
                    return message.channel.send("<@"+message.author.id+"> **[Invalid Amount]** (Minimum of 100 <:PopflixCoin:1289329625792774155>)");
                };
            };

            if (amount > userProfile.balance) {
                return message.reply({
                    embeds: [{
                        title: "Insufficient Balance",
                        description: "Your balance is: **"+userProfile.balance+"** <:PopflixCoin:1289329625792774155>\nYou tried to gamble: **"+amount+"** <:PopflixCoin:1289329625792774155>",
                        color: parseInt("f50000", 16)
                    }]
                }).then(embedMessage => {
                    //Random Robbery Chance
                    if (userProfile.balance > 1 && Math.floor(Math.random() * 20) === 0) {
                        robbery.execute(embedMessage, message);
                    };
                });
            };

            //Groups of Random Emojis
            const g1 = ['<a:Slots_1_3:1289851718393139252>', '<a:Slots_1_2:1289851677352136724>', '<a:Slots_1_2:1289820548087418961>', '<:Slots_1_11:1290119262416928819>', '<:Slots_1_bleach:1290119822528614420>', '<:Slots_1_emoji_28:1290119864232710264>', '<:Slots_1_emoji_50:1290119884256051220>', '<:Slots_1_mason:1290119902677565440>', '<:Slots_SusImposter:1290186676483784756>'];
            const g2 = ['<a:Slots_2_1:1290131392327581807>', '<a:Slots_2_2:1290131408748285994>', '<a:Slots_2_3:1290131420844658688>', '<:Slots_2_Betrayal:1290131829143113758>', '<:Slots_2_child:1290131848575586366>', '<:Slots_2_dumdum:1290131865310593097>', '<:Slots_2_emoji_46:1290131884566773871>', '<:Slots_2_Sumi1:1290131901436137554>', '<:Slots_SusImposter:1290186676483784756>'];
            const g3 = ['<a:Slots_3_1:1290138116623175691>', '<a:Slots_3_2:1290138132762595378>', '<a:Slots_3_3:1290138146511786065>', '<:Slots_3_coochieman:1290138602445082717>', '<:Slots_3_H_Energy:1290138610439290940>', '<:Slots_3_hehe:1290138619868086333>', '<:Slots_3_jobamaasf:1290138630634999830>', '<:Slots_3_Sumi3:1290138640030371930>', '<:Slots_SusImposter:1290186676483784756>'];
            const g4 = ['<a:Slots_4_1:1290141570129072198>', '<a:Slots_4_2:1290141583433535508>', '<a:Slots_4_3:1290141595668316221>', '<:Slots_4_bruh:1290141968248078376>', '<:Slots_4_emoji_22:1290141996224217170>', '<:Slots_4_ficofili2:1290142011961376838>', '<:Slots_4_krabpog_11:1290142030839676972>', '<:Slots_4_Pain:1290142047948247143>', '<:Slots_SusImposter:1290186676483784756>'];
            const g5 = ['<a:Slots_5_1:1290144471635460167>', '<a:Slots_5_2:1290144503172436009>', '<a:Slots_5_3:1290144537183916122>', '<:Slots_5_MakeGoodChoices:1290144785520398510>', '<:Slots_5_NOOOOOOOOOO:1290144799550341142>', '<:Slots_5_seanmoment:1290144809318617230>', '<:Slots_5_Sheesh:1290144819456512052>', '<:Slots_5_yes:1290144829476569209>', '<:Slots_SusImposter:1290186676483784756>'];
            const g6 = ['<a:Slots_6_1:1290153674173190226>', '<a:Slots_6_2:1290153689574805567>', '<a:Slots_6_3:1290153702430347374>', '<:Slots_6_chip:1290153796806119424>', '<:Slots_6_discordadmin:1290153812962574407>', '<:Slots_6_justinpog:1290153828930551889>', '<:Slots_6_mick:1290153844474642452>', '<:Slots_6_MMM:1290153859682926654>', '<:Slots_SusImposter:1290186676483784756>'];
            const g7 = ['<a:Slots_7_1:1290155495415611423>', '<a:Slots_7_2:1290155508518617119>', '<a:Slots_7_3:1290155521352929382>', '<:Slots_7_Nice:1290155608292462622>', '<:Slots_7_Stare:1290155624830865439>', '<:Slots_7_Sumi2:1290155640312037449>', '<:Slots_7_wakeup:1290155655591755859>', '<:Slots_7_whenthe:1290155669994999931>', '<:Slots_SusImposter:1290186676483784756>'];
            const g8 = ['<a:Slots_8_1:1290157222831329362>', '<a:Slots_8_2:1290157235309248522>', '<a:Slots_8_3:1290157248689082450>', '<:Slots_8_chip_supreme:1290157353731100734>', '<:Slots_8_emoji_21:1290157368331472926>', '<:Slots_8_emoji_45:1290157383091490879>', '<:Slots_8_Sin:1290157398178140200>', '<:Slots_8_Ugly_Jonkler:1290157412677849169>', '<:Slots_SusImposter:1290186676483784756>'];
            const g9 = ['<a:Slots_9_1:1290160102673879080>', '<a:Slots_9_2:1290160114673778719>', '<a:Slots_9_3:1290160125964714107>', '<:Slots_9_chippo:1290160336317714503>', '<:Slots_9_emoji_10:1290160347205861397>', '<:Slots_9_emoji_24:1290160355888201729>', '<:Slots_9_pog:1290160365841154140>', '<:Slots_9_sexydaddymason:1290160374795997267>', '<:Slots_SusImposter:1290186676483784756>'];
            const g10 = ['<a:Slots_10_1:1290168283236143237>', '<a:Slots_10_2:1290168295777112065>', '<a:Slots_10_3:1290168306225119286>', '<:Slots_10_898786565415923743:1290168410260373574>', '<:Slots_10_MinecraftCursedImage7:1290168420649668608>', '<:Slots_10_reversecard:1290168429776732223>', '<:Slots_10_thCC651BKH:1290168438882566187>', '<:Slots_10_Trappedchest:1290168448093126667>', '<:Slots_SusImposter:1290186676483784756>'];
            const g11 = ['<a:Slots_11_1:1290169917039050875>', '<a:Slots_11_2:1290169942846738462>', '<a:Slots_11_3:1290169955584708629>', '<:Slots_11_1038468360008122368:1290170127735717954>', '<:Slots_11_FToPayRespects:1290170158601601035>', '<:Slots_11_gasp:1290170176058163281>', '<:Slots_11_MinecraftCursedImage6:1290170214624788511>', '<:Slots_11_spoonhand:1290170228612796502>', '<:Slots_SusImposter:1290186676483784756>'];
            const g12 = ['<a:Slots_12_1:1290175765979332692>', '<a:Slots_12_2:1290175779405037621>', '<a:Slots_12_3:1290175791635763232>', '<:Slots_12_DiscordAdmin:1290175955628851286>', '<:Slots_12_Echidna:1290175983311126539>', '<:Slots_12_Emelia:1290176001485045791>', '<:Slots_12_Rem:1290176019399053339>', '<:Slots_12_Senku:1290176034792149042>', '<:Slots_SusImposter:1290186676483784756>'];
            const g13 = ['<a:Slots_13_1:1290178308364959794>', '<a:Slots_13_2:1290178322084401224>', '<a:Slots_13_3:1290178337200672872>', '<:Slots_13_face:1290178527391645736>', '<:Slots_13_fung:1290178553983402005>', '<:Slots_13_Kanna:1290178579841155133>', '<:Slots_13_themuhfuckinuhhh:1290178603375529984>', '<:Slots_13_Tohru:1290178634169978950>', '<:Slots_SusImposter:1290186676483784756>'];
            const g14 = ['<a:Slots_14_1:1290180591072837662>', '<a:Slots_14_2:1290180606528847927>', '<a:Slots_14_3:1290180619934105701>', '<:Slots_14_Bread:1290180971236163627>', '<:Slots_14_BurningPotato:1290180981793488966>', '<:Slots_14_GreenSteve:1290180991771480085>', '<:Slots_14_MinecraftCursedImage5:1290181001523367949>', '<:Slots_14_TheNetherHub:1290181011006689300>', '<:Slots_SusImposter:1290186676483784756>'];
            const g15 = ['<a:Slots_15_1:1290182444540235869>', '<a:Slots_15_2:1290182459207581696>', '<a:Slots_15_3:1290182470804701234>', '<:Slots_15_JesusHacks:1290182588949987348>', '<:Slots_15_MinecraftCursedImage1:1290182613918679146>', '<:Slots_15_MinecraftCursedImage2:1290182625473855565>', '<:Slots_15_MinecraftCursedImage3:1290182638572929054>', '<:Slots_15_obamium:1290182648055988337>', '<:Slots_SusImposter:1290186676483784756>'];
            const g16 = ['<a:Slots_16_1:1290184023754412062>', '<a:Slots_16_2:1290184036328931339>', '<a:Slots_16_3:1290184049545183306>', '<:Slots_16_Mg:1290184180126449684>', '<:Slots_16_MinecraftCursedImage4:1290184207884095608>', '<:Slots_16_P_:1290184269171265577>', '<:Slots_16_Thiccen:1290184313677287496>', '<:Slots_16_Zn:1290184334497550420>', '<:Slots_SusImposter:1290186676483784756>'];
            const g17 = ['<a:Slots_17_1:1290185359614808124>', '<a:Slots_17_2:1290185372021821481>', '<a:Slots_17_3:1290185396667420704>', '<:Slots_17_lukeskywalker:1290185559846944829>', '<:Slots_17_Orcs:1290185571100135435>', '<:Slots_17_Retribution:1290185581975834676>', '<:Slots_17_silence:1290185590398124074>', '<:Slots_17_Travis_Scott:1290185599478792235>', '<:Slots_SusImposter:1290186676483784756>'];
            const groups = [g1, g2, g3, g4, g5, g6, g7, g8, g9, g10, g11, g12, g13, g14, g15, g16, g17];

            //Choose a Random Group
            const groupChoice = Math.floor(Math.random() * (groups.length));
            const g = groups[groupChoice];

            //Get Slots Results
            var result1 = (Math.floor(Math.random() * (5 - 1 + 1) + 1)) + 2;
            var result2 = (Math.floor(Math.random() * (6 - 1 + 1) + 1)) + 2;
            var result3 = (Math.floor(Math.random() * (6 - 1 + 1) + 1)) + 2;

            //Create a higher chance of matching the first result
            if (result2 === 8) {
                result2 = result1;
            };
            if (result3 === 8) {
                result3 = result1;
            };

            //On Win
            var didWin = false;
            var color = parseInt("f50000", 16);
            var resultText = "❌ YOU LOST ❌";

            if (result1 === result2 && result2 === result3 && result3 === result1) { //Win
                //Check for Imposter Chance
                const imposterChance = 250; //(1/250)
                if (Math.floor(Math.random() * imposterChance) === 0) { //Lose
                    console.log("SUS");
                    result1 = 8;
                    result2 = 8;
                    result3 = 8;

                    color = parseInt("f50000", 16)
                    resultText = "❌ YOU LOST ❌";
                } else {
                    color = parseInt("00f53d", 16)
                    resultText = "🎉 YOU WON 🎉";
                };

                //Continue Win Code
                didWin = true;
            } else { //Lose
                color = parseInt("f50000", 16);
                resultText = "❌ YOU LOST ❌";
            };

            //Animate Slot Machine
            const slot = await message.reply({
                embeds: [{
                    title: "🎰 SLOTS 🎰",
                    description: `⌞ ${g[0]} ${g[1]} ${g[2]} ⌟`
                }]
            });

            slot.edit({
                embeds: [{
                    title: "🎰 SLOTS 🎰",
                    description: `⌞ ${g[0]} ${g[1]} ${g[2]} ⌟`
                }]
            });

            setTimeout(async () => {
                slot.edit({
                    embeds: [{
                        title: "🎰 SLOTS 🎰",
                        description: `⌞ ${g[result1]} ${g[1]} ${g[2]} ⌟`
                    }]
                });

                setTimeout(async () => {
                    slot.edit({
                        embeds: [{
                            title: "🎰 SLOTS 🎰",
                            description: `⌞ ${g[result1]} ${g[result2]} ${g[2]} ⌟`
                        }]
                    });
                    setTimeout(async () => {
                        slot.edit({
                            embeds: [{
                                title: "🎰 SLOTS 🎰",
                                description: `⌞ ${g[result1]} ${g[result2]} ${g[result3]} ⌟`
                            }]
                        });

                        setTimeout(async () => {
                            slot.edit({
                                embeds: [{
                                    title: "🎰 SLOTS 🎰",
                                    description: `⌞ ${g[result1]} ${g[result2]} ${g[result3]} ⌟`,
                                    color: color
                                }]
                            });
    
                            //Check Win / Loss
                            if (didWin === true) { //Won
                                if (result1 === 8) { //Imposter Loss
                                    const amountLost = userProfile.balance;
                                    userProfile.balance = 0;

                                    //Save balance
                                    await userProfile.save();

                                    //Notify user
                                    return message.reply({
                                        embeds: [{
                                            title: "<:Slots_SusImposter:1290186676483784756> YOU LOST <:Slots_SusImposter:1290186676483784756>",
                                            description: "You lost: **"+amountLost+"** <:PopflixCoin:1289329625792774155>\nYour new balance is: **"+userProfile.balance+"** <:PopflixCoin:1289329625792774155>",
                                            color: parseInt("f50000", 16)
                                        }]
                                    }).then(embedMessage => {
                                        //Random Robbery Chance
                                        if (userProfile.balance > 1 && Math.floor(Math.random() * 20) === 0) {
                                            robbery.execute(embedMessage, message);
                                        };
                                    });
                                    
                                } if (g === groups[0] && result1 === 8) { //Juichi Win
                                    const amountWon = (5 * amount) + Number((amount * (Math.random() * 15.0)).toFixed(0));
                                    userProfile.balance += amountWon;

                                    //Save balance
                                    await userProfile.save();

                                    //Notify user
                                    return message.reply({
                                        embeds: [{
                                            title: "<:Slots_1_11:1290119262416928819> YOU WON <:Slots_1_11:1290119262416928819>",
                                            description: "You won: **"+amountWon+"** <:PopflixCoin:1289329625792774155>\nYour new balance is: **"+userProfile.balance+"** <:PopflixCoin:1289329625792774155>",
                                            color: parseInt("00f53d", 16)
                                        }]
                                    }).then(embedMessage => {
                                        //Random Robbery Chance
                                        if (userProfile.balance > 1 && Math.floor(Math.random() * 20) === 0) {
                                            robbery.execute(embedMessage, message);
                                        };
                                    });
                                } else { //Normal Win
                                    const amountWon = (3 * amount) + Number((amount * (Math.random() * 10.0)).toFixed(0));
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
                                    }).then(embedMessage => {
                                        //Random Robbery Chance
                                        if (userProfile.balance > 1 && Math.floor(Math.random() * 20) === 0) {
                                            robbery.execute(embedMessage, message);
                                        };
                                    });
                                };
                            } else { //Loss
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
                                    }).then(embedMessage => {
                                        //Random Robbery Chance
                                        if (userProfile.balance > 1 && Math.floor(Math.random() * 20) === 0) {
                                            robbery.execute(embedMessage, message);
                                        };
                                    });
                                } else {
                                    return message.reply({
                                        embeds: [{
                                            title: "❌ YOU LOST ❌",
                                            description: "You tried to gamble: **"+amount+"** <:PopflixCoin:1289329625792774155>\nYour new balance is: **"+userProfile.balance+"** <:PopflixCoin:1289329625792774155>",
                                            color: parseInt("f50000", 16)
                                        }]
                                    }).then(embedMessage => {
                                        //Random Robbery Chance
                                        if (userProfile.balance > 1 && Math.floor(Math.random() * 20) === 0) {
                                            robbery.execute(embedMessage, message);
                                        };
                                    });
                                };
                            };
                        }, "250");
                    }, "1500");
                }, "1750");
            }, "2000");
        } catch (error) {
            console.log("SLOTS COMMAND ERROR: "+error);
        };
    }
};