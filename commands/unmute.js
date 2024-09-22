module.exports = {
  name: 'unmute',
  description: 'unmutes a specified user',
  execute(msg, message){
    //Packages
    const Discord = require('discord.js');
    
    //Command
    if ((message.member.roles.cache.find(r => r.name === "Admin"))||(message.author.id == '412278016429785089')) {

      const args = message.content.slice("!unmute").trim().split(' ');
      const command = args.shift().toLowerCase();

      if (command === '!unmute') {
        if (!args.length) {
          return message.channel.send("<@" + message.author.id + "> **[Invalid User]**")
        }
      }
      const mention = message.mentions.members.first;
      if (msg.startsWith('!unmute <@')) {
        if (!msg.startsWith('!unmute <@&')) {
          let role = message.guild.roles.cache.find(r => r.id === "777273578230906970");
          let adminRole = message.guild.roles.cache.find(r => r.id === "731920530470600824");
          let member = message.mentions.members.first();

          setTimeout(() => {
            if ((member.id == '344140331941363733')||(member.id == '412278016429785089')||(member.id == '490196736103677975')||(member.id == '479055378991284273')/*||(member.id == '555771957535047700')*//*||(member.id == '274644519591477250')*/||(member.id == '512034141248946188')||(member.id == '460969230439940108')||(member.id == '291373805769850882')||(member.id == '340556433693343756')||(member.id == '614970511059058691')) {
              member.roles.add(adminRole);
            }
            member.roles.remove(role);
            message.channel.send("<@" + member.id + "> was **Unmuted** by <@"+message.author.id+">");
          }, 500);
        } else if ((msg.startsWith('!unmute <@&'))||(!msg.startsWith('!unmute <@'))) {
          message.channel.send("<@" + message.author.id + "> **[Invalid User]**");
        }
      } else if ((msg.startsWith('!unmute <@&'))||(!msg.startsWith('!unmute <@'))) {
        message.channel.send("<@" + message.author.id + "> **[Invalid User]**");
      }
    }
  }
}
