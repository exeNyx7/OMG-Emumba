const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bookingController = require('./bookingController');

dotenv.config();
const app = express();

app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Routes
app.post('/bookings', bookingController.createBooking);
app.get('/bookings/:userId', bookingController.getUserBookings);
app.delete('/bookings/:bookingId', bookingController.cancelBooking);

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
    console.log(`Booking Service running on port ${PORT}`);
}); 