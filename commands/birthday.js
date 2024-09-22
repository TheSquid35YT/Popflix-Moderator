module.exports = {
  name: 'birthday',
  description: 'sends Birthday Wishes to #reminder in the discord server when it is someone\'s birthday',
  execute(client) {
    //Packages
    const Discord = require('discord.js');

    //Command
    var textChannel = client.channels.cache.find(
      channel => channel.id === '731713435506704424'//Popflix
    );
    var d = new Date();
    var options = { month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    options.timeZone = 'UTC';
    options.timeZoneName = 'short';
    //console.log(d.toLocaleString('en-US', options));

    //January
    //Ashton Egonut (January 7th, 2005)
    if (d.toLocaleTimeString('en-US', options) === 'January 7, 6:00 AM UTC') {
      //12:00 AM CST is "6:00:00 AM UTC"
      textChannel.send('Hey @everyone, it\'s <@614970511059058691>\'s Birthday! **Happy  Birthday <@614970511059058691>**');
    }
    //February
    //Josh Waite (February 4th, 2005)
    if (d.toLocaleTimeString('en-US', options) === 'February 4, 6:00 AM UTC') {
      //12:00 AM CST is "6:00:00 AM UTC"
      textChannel.send('Hey @everyone, it\'s <@412278016429785089>\'s Birthday! **Happy  Birthday <@412278016429785089>**');
    }
    //Jadon Ziebell (February 24th, 2005)
    if (d.toLocaleTimeString('en-US', options) === 'February 24, 6:00 AM UTC') {
      //12:00 AM CST is "6:00:00 AM UTC"
      textChannel.send('Hey @everyone, it\'s <@555771957535047700>\'s Birthday! **Happy  Birthday <@555771957535047700>**');
    }
    //Bri Dubey (February 26th, 2005)
    if (d.toLocaleTimeString('en-US', options) === 'February 26, 6:00 AM UTC') {
      //12:00 AM CST is "6:00:00 AM UTC"
      textChannel.send('Hey @everyone, it\'s <@460969230439940108>\'s Birthday! **Happy  Birthday <@460969230439940108>**');
    }
    //March
    //JT Misevicz (March 30th, 2005)
    if (d.toLocaleTimeString('en-US', options) === 'March 30, 5:00 AM UTC') {
      //12:00 AM CST is "5:00:00 AM UTC"
      textChannel.send('Hey @everyone, it\'s <@490196736103677975>\'s Birthday! **Happy  Birthday <@490196736103677975>!**');
    }
    //April
    //Meadow Gehrlein (April 1st, 2005)
    if (d.toLocaleTimeString('en-US', options) === 'April 1, 5:00 AM UTC') {
      //12:00 AM CST is "5:00:00 AM UTC"
      textChannel.send('Hey @everyone, it\'s <@529848159799607308>\'s Birthday! **Happy  Birthday <@529848159799607308>!**');
    }
    //Nate Boss (April 20th, 2005)
    if (d.toLocaleTimeString('en-US', options) === 'April 20, 5:00 AM UTC') {
      //12:00 AM CST is "5:00:00 AM UTC"
      textChannel.send('Hey @everyone, it\'s <@608782462457348102>\'s Birthday! **Happy  Birthday <@608782462457348102>!**');
    }
    //May
    //Theo Bjornstad (May 3rd, 2005)
    if (d.toLocaleTimeString('en-US', options) === 'May 3, 5:00 AM UTC') {
      //12:00 AM CST is "5:00:00 AM UTC"
      textChannel.send('Hey @everyone, it\'s <@512034141248946188>\'s Birthday! **Happy  Birthday <@512034141248946188>!**');
    }
    //Chip Calcatera (May 4th, 2005)
    if (d.toLocaleTimeString('en-US', options) === 'May 4, 5:00 AM UTC') {
      //12:00 AM CST is "5:00:00 AM UTC"
      textChannel.send('Hey @everyone, it\'s <@496516563680100356>\'s Birthday! **Happy  Birthday <@496516563680100356>!**');
    }
    //Jason Coates-Sanders (May 7th, 2005)
    if (d.toLocaleTimeString('en-US', options) === 'May 7, 5:00 PM UTC') {
      //12:00 AM CST is "5:00:00 AM UTC"
      textChannel.send('Hey @everyone, it\'s <@991747966803124315>\'s Birthday! **Happy  Birthday <@991747966803124315>!**');
    }
    //Michael Printz (May 12th, 2005)
    if (d.toLocaleTimeString('en-US', options) === 'May 12, 5:00 AM UTC') {
      //12:00 AM CST is "5:00:00 AM UTC"
      textChannel.send('Hey @everyone, it\'s <@340556433693343756>\'s Birthday! **Happy  Birthday <@340556433693343756>!**');
    }//Joshua Lopez (May 12th, 2005)
    if (d.toLocaleTimeString('en-US', options) === 'May 12, 5:00 AM UTC') {
      //12:00 AM CST is "5:00:00 AM UTC"
      textChannel.send('Hey @everyone, it\'s <@274644519591477250>\'s Birthday! **Happy  Birthday <@274644519591477250>!**');
    }
    //Numi (May 30th, 2004)
    if (d.toLocaleTimeString('en-US', options) === 'May 30, 5:00 AM UTC') {
      //12:00 AM CST is "5:00:00 AM UTC"
      textChannel.send('Hey @everyone, it\'s <@344329742566031362>\'s Birthday! **Happy  Birthday <@344329742566031362>!**');
    }
    //June
    //Dominic Young (June 10th, 2005)
    if (d.toLocaleTimeString('en-US', options) === 'June 10, 5:00 AM UTC') {
      //12:00 AM CST is "5:00:00 AM UTC"
      textChannel.send('Hey @everyone, it\'s <@344140331941363733>\'s Birthday! **Happy  Birthday <@344140331941363733>!**');
    }
    //Whoops (June 17th, 2020)
    if (d.toLocaleTimeString('en-US', options) === 'June 17, 5:00 AM UTC') {
      //12:00 AM CST is "5:00:00 AM UTC" After Springing Ahead
      textChannel.send('Hey @everyone, it\'s <@722202628867489852>\'s Birthday! **Happy  Birthday <@722202628867489852>!**');
    }
    //Jake (June 23rd, 2004)
    if (d.toLocaleTimeString('en-US', options) === 'June 23, 5:00 AM UTC') {
      //12:00 AM CST is "5:00:00 AM UTC" After Springing Ahead
      textChannel.send('Hey @everyone, it\'s <@434160506194886662>\'s Birthday! **Happy  Birthday <@434160506194886662>!**');
    }
    //Daniel Salman (June 28th, 2005)
    if (d.toLocaleTimeString('en-US', options) === 'June 28, 5:00 AM UTC') {
      //12:00 AM CST is "5:00:00 AM UTC" After Springing Ahead
      textChannel.send('Hey @everyone, it\'s <@535815320305139712>\'s Birthday! **Happy  Birthday <@535815320305139712>!**');
    }
    //Mason Herrick (June 30th, 2005)
    if (d.toLocaleTimeString('en-US', options) === 'June 30, 5:00 AM UTC') {
      //12:00 AM CST is "5:00:00 AM UTC" After Springing Ahead
      textChannel.send('Hey @everyone, it\'s <@479055378991284273>\'s Birthday! **Happy  Birthday <@479055378991284273>!**');
    }
    //July
    //Sam (July 4th, 2005)
    if (d.toLocaleTimeString('en-US', options) === 'July 4, 5:00 AM UTC') {
      //12:00 AM CST is "5:00:00 AM UTC" After Springing Ahead
      textChannel.send('Hey @everyone, <@842775170804482108> is feeling very patriotic!');
    }
    //Justin Pilkington (July 5th, 2005)
    if (d.toLocaleTimeString('en-US', options) === 'July 5, 5:00 AM UTC') {
      //12:00 AM CST is "5:00:00 AM UTC" After Springing Ahead
      textChannel.send('Hey @everyone, it\'s <@427982759865352213>\'s Birthday! **Happy  Birthday <@427982759865352213>!**');
    }
    //Jeremy Selwitschka (July 9th, 2004)
    if (d.toLocaleTimeString('en-US', options) === 'July 9, 5:00 AM UTC') {
      //12:00 AM CST is "5:00:00 AM UTC" After Springing Ahead
      textChannel.send('Hey @everyone, it\'s <@427982759865352213>\'s Birthday! **Happy  Birthday <@427982759865352213>!**');
    }
    //Jimmy Ertmer (July 17th, 2005)
    if (d.toLocaleTimeString('en-US', options) === 'July 17, 5:00 AM UTC') {
      //12:00 AM CST is "5:00:00 AM UTC" After Springing Ahead
      textChannel.send('Hey @everyone, it\'s <@556253092434280449>\'s Birthday! **Happy  Birthday <@556253092434280449>!**');
    }
    //Ari S (July 18th, 2005)
    if (d.toLocaleTimeString('en-US', options) === 'July 18, 5:00 AM UTC') {
      //12:00 AM CST is "5:00:00 AM UTC" After Springing Ahead
      textChannel.send('Hey @everyone, it\'s <@824460387964944407>\'s Birthday! **Happy  Birthday <@824460387964944407>!**');
    }
    //August
    //Sean Price (August 9th, 2004)
    if (d.toLocaleTimeString('en-US', options) === 'August 9, 9:00 AM UTC') {
      //12:00 AM CST is "5:00:00 AM UTC" After Springing Ahead
      textChannel.send('Hey @everyone, it\'s <@291373805769850882>\'s Birthday! **Happy  Birthday <@291373805769850882>!**');
    }
    //September
    //October
    //November
      //Victoria (November 9th, 2005)
		  if (d.toLocaleTimeString('en-US', options) === 'November 9, 6:00 AM UTC') {
        //12:00 AM CST is "6:00:00 AM UTC"
        textChannel.send('Hey @everyone, it\'s <@773300935802880011>\'s Birthday! **Happy  Birthday <@773300935802880011>!**');
      }

    //Popflix V2 (November 13th, 2020)
    if (d.toLocaleTimeString('en-US', options) === 'November 13, 6:00 AM UTC') {
      //12:00 AM CST is "6:00:00 AM UTC"
      textChannel.send('Hey @everyone, it\'s **Popflix and Chilly V2\'s Birthday!** \rCheck out <#777073266346950676>');
      textChannel.send({
        embed: {
          title: 'Nice',
          image: {
            url:
              'https://media.discordapp.net/attachments/496823793294114818/777365307386757130/image0.jpg?width=479&height=572'
          }
        }
      });
    }

    //Popflix Moderator (November 14th, 2020)
    if (d.toLocaleTimeString('en-US', options) === 'November 14, 6:00 AM UTC') {
      //12:00 AM CST is "6:00:00 AM UTC"
      textChannel.send('Hey @everyone, it\'s my Birthday! **Happy  Birthday to Me!**');
    }

    //December
    //Joe (December 13th, 2004)
    if (d.toLocaleTimeString('en-US', options) === 'December 13, 6:00 AM UTC') {
      //12:00 AM CST is "6:00:00 AM UTC"
      textChannel.send('Hey @everyone, it\'s Mr. PinkyPandaQuack\'s Birthday! **Happy  Birthday Mr. PinkyPandaQuack!**');
    }

    //Dylenn (December 15th, 2004)
    if (d.toLocaleTimeString('en-US', options) === 'December 15, 6:00 AM UTC') {
      //12:00 AM CST is "6:00:00 AM UTC"
      textChannel.send('Hey @everyone, it\'s <@660947724937723904>\'s Birthday! **Happy  Birthday <@660947724937723904>!**');
    }

    //Quinn Smith (December 26th, 2004)
    if (d.toLocaleTimeString('en-US', options) === 'December 26, 6:00 AM UTC') {
      //12:00 AM CST is "6:00:00 AM UTC"
      textChannel.send('Hey @everyone, it\'s <@420365147949760512>\'s Birthday! **Happy  Birthday <@420365147949760512>!**');
    }
  }
}
