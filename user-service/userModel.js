const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        unique: true
    },
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    maxBookings: {
        type: Number,
        default: 3
    },

    activeBookings:
    {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('User', userSchema); 