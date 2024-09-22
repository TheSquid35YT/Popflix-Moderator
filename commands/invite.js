module.exports = {
  name: 'invite',
  description: 'sends the user an invite to the server',
  execute(msg, message, args, client){
    //Packages
    const Discord = require('discord.js');
    
    //Command
    message.channel.send("<@"+message.author.id+"> Here is the invite link to Popflix And Chilly V2:\nhttps://discord.gg/ycpjtY9yhh");
  }
}