module.exports = {
  name: 'ping',
  description: 'sends the user the bot\'s ping',
  execute(msg, message){
    //Packages
    const Discord = require('discord.js');
    
    //Command
    var ping = Date.now() - message.createdTimestamp + " ms";

    /*const pong = new Discord.MessageEmbed()
      .setTitle("🏓 Pong!")
      .setDescription("My ping is `" + `${Date.now() - message.createdTimestamp}` + " ms`")
    message.channel.send(pong);*/
    message.channel.send({
      embeds: [{
        title: "🏓 Pong!",
        description: "My ping is `"+ping+"`"
      }]
    });
  }
}