const { Schema, model, default: mongoose } = require('mongoose');

const timeOutReplaceSchema = new Schema({
    id: {
        type: String,  // First string
        required: true
    },
    time: {
        type: String,  // Second string
        required: true
    },
    roles: {
        type: [String]
    }
});

const popflixStatsSchema = new Schema({
    dataBaseID: {
        type: String,
        required: true,
    },
    timeOutReplace: {
        type: [timeOutReplaceSchema],
    }
    /*userId: {
        type: String,
        required: true,
    },
    balance: {
        type: Number,
        default: 0,
    },
    lastDailyCollected: {
        type: Date,
    },
    dailyStreakMultiplier: {
        type: Number,
        default: 100,
    }*/
},
{ timestamps: true });

module.exports = model('popflixStats', popflixStatsSchema);