module.exports = {
  name: 'nice',
  description: 'sends the user an image of Friday the 13th... in 2020 followed by the reply of Liam Herrick of, \'nice\'',
  execute(msg, message){
    //Packages
    const Discord = require('discord.js');
    
    //Command
    message.channel.send({
      embeds: [{
        title: "Nice",
        image: {
          url: "https://media.discordapp.net/attachments/496823793294114818/777365307386757130/image0.jpg?width=479&height=572"
        }
      }]
    });
  }
}