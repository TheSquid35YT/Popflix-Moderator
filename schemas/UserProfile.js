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
        type: mongoose.Types.Decimal128,
        default: 1.00,
    }
},
{ timestamps: true });

module.exports = model('UserProfile', userProfileSchema);