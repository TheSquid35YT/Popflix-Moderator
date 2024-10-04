const { Schema, model, default: mongoose } = require('mongoose');

//Replace roles after gamble soul timeout ends
const timeOutReplaceSchema = new Schema({
    id: {
        type: String, //ID of the member
        required: true,
    },
    time: {
        type: Date, //Time for timeout to be removed
        required: true,
    },
    adminCheck: { 
        type: Boolean, //Check whether or not to give admin
        required: true,
    }
});

//No Gif Thursday contenders and losers
const noGifThursdaySchema = new Schema({
    contenders: {
        type: [String], //Array of member IDs of those who have sent a message on No Gif Thursday
    },
    losers: {
        type: [String], //Array of member IDs of those who have sent a Gif on No Gif Thursday
    },
    midnightCheck: {
        type: Boolean,
    }
});

const popflixStatsSchema = new Schema({
    dataBaseID: {
        type: String,
        required: true,
    },
    timeOutReplace: { //Replace roles after gamble soul timeout ends
        type: [timeOutReplaceSchema],
        required: true,
    },
    noGifThursday: { //No Gif Thursday contenders and losers
        type: noGifThursdaySchema,
        required: true,
    }
},
{ timestamps: true });

module.exports = model('popflixStats', popflixStatsSchema);