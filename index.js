//Packages
const Discord = require('discord.js');
//const ytdl = require('ytdl-core');
//const opusscript = require("opusscript");
//const ffmpeg = require('ffmpeg-static');
//const clipboardy = require('clipboardy');
//const TwitchWebhook = require('twitch-webhook');
//const rss = require('rss-converter');
//const config = require('./config.json');

//Keep the bot alive
const keep_alive = require('./keep_alive.js')

const client = new Discord.Client();
const token = process.env.DISCORD_BOT_SECRET;

//Command Handler
const fs = require('fs');
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);

  client.commands.set(command.name, command);
}

//Role Color
const muted = ['777273578230906970'];

//Cringe Japanese Characters
const japanese = ['あ','い','う','え','お','か','き','く','け','こ','さ','し','す','せ','そ','た','ち','つ','て','と','な','に','ぬ','ね','の','は','ひ','ふ','へ','ほ','ま','み','む','め','も','や','ゆ','よ','ら','り','る','れ','ろ','わ','を','ん']


client.on('ready', () => {
  console.log("I'm in");
  console.log(client.user.username);
  client.user.setActivity('Kitten in the VC', { type: 'LISTENING' });

  //Birthday Wishes
  setInterval(() => {
		client.commands.get('birthday').execute(client);
	}, 60000); //Check every minute
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

client.on('message', message => {

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
	  } else if (message.content.toLowerCase().startsWith('!invite')) {
      //!invite command
      client.commands.get('invite').execute(msg, message, args, client);
    }; // Add an "else if" for new commands here

    for (var i = 0; i < japanese.length; i++) {
      if (message.content.includes(japanese[i])) {

        message.author.send("Hey, <@"+message.author.id+">! You said, \"`"+message.content+"`\" which was pretty cringe. Don't worry though, I've removed it.");
        message.delete();
        break;
      }
    }

};

  //const dropBattery = Math.floor(Math.random());
  //console.log(dropBattery);

});

//Check For New YouTube Videos
/*
client.on("ready", async () => {
    setInterval(async () => {
      //The_Squid_35
      let feed1 = await rss.toJson('https://www.youtube.com/feeds/videos.xml?channel_id=' + config.channel_yt1);
      let jsonOpen = fs.readFileSync('links.json');
      let json = JSON.parse(jsonOpen);
      if (jsonOpen.includes(feed1.items[0].yt_videoId)) return;
      json.push(feed1.items[0].yt_videoId);
      let jsonLink = JSON.stringify(json);
      fs.writeFileSync('links.json', jsonLink);
      client.channels.cache.get(config.channel_id).send(`Hey @everyone, **${feed1.author.name}** has uploaded a new YouTube! Go check out **${feed1.items[0].title} at **https://www.youtube.com/watch?v=${feed1.items[0].yt_videoId}`)
    }, 60000);
    setInterval(async () => {
      //Waterboiii
      let feed2 = await rss.toJson('https://www.youtube.com/feeds/videos.xml?channel_id=' + config.channel_yt2);
      let jsonOpen = fs.readFileSync('links.json');
      let json = JSON.parse(jsonOpen);
      if (jsonOpen.includes(feed2.items[0].yt_videoId)) return;
      json.push(feed2.items[0].yt_videoId);
      let jsonLink = JSON.stringify(json);
      fs.writeFileSync('links.json', jsonLink);
      client.channels.cache.get(config.channel_id).send(`Hey @everyone, **${feed2.author.name}** has uploaded a new YouTube! Go check out **${feed2.items[0].title} at **https://www.youtube.com/watch?v=${feed2.items[0].yt_videoId}`)
    }, 60000);
    setInterval(async () => {
      //C-46
      let feed3 = await rss.toJson('https://www.youtube.com/feeds/videos.xml?channel_id=' + config.channel_yt3);
      let jsonOpen = fs.readFileSync('links.json');
      let json = JSON.parse(jsonOpen);
      if (jsonOpen.includes(feed3.items[0].yt_videoId)) return;
      json.push(feed3.items[0].yt_videoId);
      let jsonLink = JSON.stringify(json);
      fs.writeFileSync('links.json', jsonLink);
      client.channels.cache.get(config.channel_id).send(`Hey @everyone, **${feed3.author.name}** has uploaded a new YouTube! Go check out **${feed3.items[0].title} at **https://www.youtube.com/watch?v=${feed3.items[0].yt_videoId}`)
    }, 60000);
    setInterval(async () => {
      //PaperMache
      let feed4 = await rss.toJson('https://www.youtube.com/feeds/videos.xml?channel_id=' + config.channel_yt4);
      let jsonOpen = fs.readFileSync('links.json');
      let json = JSON.parse(jsonOpen);
      if (jsonOpen.includes(feed4.items[0].yt_videoId)) return;
      json.push(feed4.items[0].yt_videoId);
      let jsonLink = JSON.stringify(json);
      fs.writeFileSync('links.json', jsonLink);
      client.channels.cache.get(config.channel_id).send(`Hey @everyone, **${feed4.author.name}** has uploaded a new YouTube! Go check out **${feed4.items[0].title} at **https://www.youtube.com/watch?v=${feed4.items[0].yt_videoId}`)
    }, 60000);
    setInterval(async () => {
      //Galactic Gamer Josh
      let feed5 = await rss.toJson('https://www.youtube.com/feeds/videos.xml?channel_id=' + config.channel_yt5);
      let jsonOpen = fs.readFileSync('links.json');
      let json = JSON.parse(jsonOpen);
      if (jsonOpen.includes(feed5.items[0].yt_videoId)) return;
      json.push(feed5.items[0].yt_videoId);
      let jsonLink = JSON.stringify(json);
      fs.writeFileSync('links.json', jsonLink);
      client.channels.cache.get(config.channel_id).send(`Hey @everyone, **${feed5.author.name}** has uploaded a new YouTube! Go check out **${feed5.items[0].title} at **https://www.youtube.com/watch?v=${feed5.items[0].yt_videoId}`)
    }, 60000);
});
*/
client.login(token);
