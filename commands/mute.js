module.exports = {
  name: 'mute',
  description: 'mutes a specified user',
  execute(msg, message){
    //Packages
    const Discord = require('discord.js');
    
    //Command
    if ((message.member.roles.cache.find(r => r.name === "Admin"))||(message.author.id == '412278016429785089')) {

      const args = message.content.slice("!mute").trim().split(' ');
      const command = args.shift().toLowerCase();

      if (command === '!mute') {
        if (!args.length) {
          return message.channel.send("<@" + message.author.id + "> **[Invalid User]**")
        };
      };
      const mention = message.mentions.members.first;
      if (msg.startsWith('!mute <@')) {
        if (!msg.startsWith('!mute <@&')) {
          let role = message.guild.roles.cache.find(r => r.id === "777273578230906970");
          let adminRole = message.guild.roles.cache.find(r => r.id === "731920530470600824");
          let member = message.mentions.members.first();

          if (member.id != 777270048288407593) {
            setTimeout(() => {
              member.roles.remove(adminRole);
              member.roles.add(role);
              message.channel.send("<@" + member.id + "> was **Muted** by <@"+message.author.id+">");
            }, 500);
          } else if (member.id == 777270048288407593) {
            message.channel.send("**No you**");
            message.member.roles.remove(adminRole);
            message.member.roles.add(role);
          }
        } else if ((msg.startsWith('!mute <@&'))||(!msg.startsWith('!mute <@'))) {
          message.channel.send("<@" + message.author.id + "> **[Invalid User]**");
        }
      } else if ((msg.startsWith('!mute <@&'))||(!msg.startsWith('!mute <@'))) {
        message.channel.send("<@" + message.author.id + "> **[Invalid User]**");
      }
    }
  }
}