const { Schema, model, default: mongoose } = require('mongoose');

const userProfileSchema = new Schema({
    userId: {
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
    }
},
{ timestamps: true });

module.exports = model('UserProfile', userProfileSchema);