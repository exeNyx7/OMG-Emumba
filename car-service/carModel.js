const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    carId:
    {
        type: String,
        required: true,
        unique: true
    },
    model: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    isAvailable: {
        type: Boolean,
        required: true,
        default: true
    }
});

module.exports = mongoose.model('Car', carSchema); 