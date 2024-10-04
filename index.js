//Packages
const Discord = require('discord.js');
const { GatewayIntentBits } = require('discord.js');
require('dotenv').config();
const mongoose = require('mongoose')
const PopflixStats = require('./schemas/PopflixStats.js');
//const adminIDs = require('./adminIDs.txt');

//Keep the bot alive
const keep_alive = require('./keep_alive.js')

//const client = new Discord.Client();
//const client = new Discord.Client({ intents: 53608447 });
const client = new Discord.Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildWebhooks,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.DirectMessageTyping,
    GatewayIntentBits.MessageContent
  ]
});
const token = process.env.DISCORD_BOT_SECRET;

//Command Handler
const fs = require('fs');
//General Commands
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);

  client.commands.set(command.name, command);
};
//Economy Commands
client.economyCommands = new Discord.Collection();
const economyCommandFiles = fs.readdirSync('./commands/economy/').filter(file => file.endsWith('.js'));
for (const file of economyCommandFiles) {
  const economyCommand = require(`./commands/economy/${file}`)

  client.economyCommands.set(economyCommand.name, economyCommand);
};

//Role Color
const muted = ['777273578230906970'];

//Cringe Japanese Characters
const japanese = ['あ','い','う','え','お','か','き','く','け','こ','さ','し','す','せ','そ','た','ち','つ','て','と','な','に','ぬ','ね','の','は','ひ','ふ','へ','ほ','ま','み','む','め','も','や','ゆ','よ','ら','り','る','れ','ろ','わ','を','ん'];

//Admin Abuse Synonyms
const adminAbuse = ['admin abuse','admin perms','owner abuse','owner perms','mod abuse','mod perms','abusing admin','abusing mod','abusing owner','abusive admin','abusive mod','abusive owner','abuse admin','abuse mod','abuse owner','power abuse','abuse power','abusing power','josh abuse','!kick <@777270048288407593>','!kick @Popflix Moderator','i hate popflix bot','i hate popflix mod','i hate popflix moderator','admin aboose'];

//No Gif Thursday
//var postedLosers = true;


client.on('ready', () => {
  console.log("I'm in");
  console.log(client.user.username);
  client.user.setActivity({ name: 'Kitten in the VC', type: 2, });

  //Every Minute Execution
  setInterval(async () => {

    //Add a central midnight checker
    //Show No Gif Thursday Results
    client.commands.get('noGifThursday').execute('READ', new Object, client);

    //Get day
    /*var midnightCheckDate = new Date();
    var midnightCheckOptions = { weekday: 'long', timeZone: 'CST' };
    var midnightCheckWeekday = new Intl.DateTimeFormat('en-US', midnightCheckOptions).format(midnightCheckDate);

    if (midnightCheckWeekday == "Friday") { //Show No Gif Thursday Results
        
    } else {

    };*/


















    //Birthday Wishes
		client.commands.get('birthday').execute(client);

    //Replace Admin
    try {
      let popflixStats = await PopflixStats.findOne({
        dataBaseID: 'POPFLIX',
      });

      //Check if the popflixStats doesn't exist
      if (!popflixStats) {
        popflixStats = new PopflixStats({
          dataBaseID: 'POPFLIX',
        });
      };

      popflixStats.timeOutReplace.forEach(async soullessMember => {
        if (soullessMember.time < new Date()) {
          const adminIDs = fs.readFileSync('./adminIDs.txt', 'utf8');
          if (adminIDs.includes(soullessMember.id)) { //soullessMember is an Admin
            //Add Admin
            const popflixGuild = await client.guilds.fetch('731710405600215050');
            const popflixMember = await popflixGuild.members.fetch(soullessMember.id);
            popflixMember.roles.add('731920530470600824');

            //Remove member from the database list
            popflixStats.timeOutReplace.splice(popflixStats.timeOutReplace.indexOf(soullessMember.id), 1);

            await popflixStats.save();
          };
        };
      });
    } catch (giveAdminError) {
      console.log(giveAdminError);
    };

    //And No Gif Thursday Conclusion
    //var now = new Date();
    //var nowOptions = { weekday: 'long', timeZone: 'CST' };
    //var friday = new Intl.DateTimeFormat('en-US', nowOptions).format(now);
    //if (friday == "Friday" && postedLosers == false) {
    //  var textChannel = client.channels.cache.find(
    //    channel => channel.id === '731713435506704424'//Popflix
      //);
      //textChannel.send("**__No Gif Thursday Losers__**\n"+fs.readFileSync('./gifLosers.txt', 'utf8'));
      //fs.writeFileSync('./gifLosers.txt', '');
      //postedLosers = true;
    //};
	}, 15000);//60000); //Check every minute
});

client.on("guildMemberAdd", member => { //When a user joins the server
  //Mute On Join
  var role = member.guild.roles.cache.find(role => role.name === 'MUTED');
  if (member.id != 695777644838387832) {
    member.roles.add(role);
  }
  //The Activator
  var activator = member.guild.roles.cache.find(role => role.name === 'The Activator');
  if (member.id == 695777644838387832) {
    member.roles.add(activator);
  }
});

//client.on('message', message => {
client.on('messageCreate', message => {

  if (message.author.id != client.user.id) {

    msg = message.content.toLowerCase();

    if (message.content.toLowerCase().startsWith('!mute')&&!msg.includes("@everyone")) { //!mute command
      client.commands.get('mute').execute(msg, message, client);
    } else if (message.content.toLowerCase().startsWith('!unmute')&&!msg.includes("@everyone")) { 
      //!unmute command
      client.commands.get('unmute').execute(msg, message, client);
    } else if (message.content.toLowerCase().startsWith("!ping")) {
      //!ping command
      client.commands.get('ping').execute(msg, message, client);
    } else if (message.content.toLowerCase().startsWith('!nice')) {
			//!nice command
      client.commands.get('nice').execute(msg, message, client);
	  } else if (message.content.toLowerCase().startsWith('!invite') || message.content.toLowerCase().startsWith('!inv')) {
      //!invite command (also works with !inv)
      client.commands.get('invite').execute(msg, message, client);
    } else if (message.content.toLowerCase().startsWith('!reset') && message.author.id === '412278016429785089') {
      //!reset command (Only For The_Squid_35)
      client.economyCommands.get('reset').execute(msg, message, client);
    } else if (message.content.toLowerCase().startsWith('!balance') || message.content.toLowerCase().startsWith('!bal')) {
      //!balance command
      client.economyCommands.get('balance').execute(msg, message, client);
    } else if (message.content.toLowerCase().startsWith('!daily')) {
      //!daily command
      client.economyCommands.get('daily').execute(msg, message, client);
    } else if (message.content.toLowerCase().startsWith('!give') || message.content.toLowerCase().startsWith('!gift') || message.content.toLowerCase().startsWith('!pay')) {
      //!give / !gift command
      client.economyCommands.get('give').execute(msg, message, client);
    } else if (message.content.toLowerCase().startsWith('!print') && message.author.id === '412278016429785089') {
      //!print command
      client.economyCommands.get('print').execute(msg, message, client);
    } else if (message.content.toLowerCase().startsWith('!gamble')) {
      //!gamble command
      client.economyCommands.get('gamble').execute(msg, message, client);
    } else if (message.content.toLowerCase().startsWith('!slots')) {
      //!slots command
      client.economyCommands.get('slots').execute(msg, message, client);
    }; // Add an "else if" for new commands here

    //Delete Japanese Character Message
    for (var i = 0; i < japanese.length; i++) {
      if (message.content.includes(japanese[i])) {

        message.author.send("Hey, <@"+message.author.id+">! You said, \"`"+message.content+"`\" which was pretty cringe. Don't worry though, I've removed it.");
        message.delete();
        break;
      };
    };

    //Check for "Admin Abuse"
    for (var i = 0; i < adminAbuse.length; i++) {
      if (message.content.toLowerCase().includes(adminAbuse[i])) {
        message.reply("https://cdn.discordapp.com/attachments/505162060808585256/1287892254039605290/Alya_Speaks_Russian.gif?ex=66f332a1&is=66f1e121&hm=41e70eb1bce41ac81561607fee669da0051989ed596594dfbf99f7a6b9200e6d&");
	      break;
      };
    };

    //Check for No Gif Thursday
    if (!message.author.bot) { //Only accept User accounts
      client.commands.get('noGifThursday').execute('WRITE', message, client);
    };

    //Check for .gorf
    if (message.content.toLowerCase().includes('.gorf')) {
      message.reply("❗❗ GIF DETECTED ❗❗");
    };

    //Award PopflixCoin to message reacter
    if ((!message.content.startsWith("!")) && (Math.floor(Math.random() * 35) === 0)) {
      client.economyCommands.get('randomClaim').execute(message);
    };
  };



  //const dropBattery = Math.floor(Math.random());
  //console.log(dropBattery);

});

//Check For New YouTube Videos


//Log In
(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  client.login(token);
})();