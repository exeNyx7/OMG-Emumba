const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    bookingId:
    {
        type: String,
        required: true,
        unique: true
    },
    userId:
    {
        type: String,
        required: true
    },
    carId: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'cancelled'],
        default: 'active'
    }
});

module.exports = mongoose.model('Booking', bookingSchema); 