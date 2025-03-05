const Booking = require('./bookingModel');
const axios = require('axios');

const bookingController = {
    // Create new booking
    createBooking: async (req, res) => {
        try {
            // Check user booking limit
            const userResponse = await axios.get(`${process.env.USER_SERVICE_URL}/users/${req.body.userId}`);
            const user = userResponse.data;

            if (user.activeBookings >= user.maxBookings) {
                console.log("Active Bookings: " + user.activeBookings);
                return res.status(400).json({ error: 'Booking limit has been reached!!!' });
            }
            console.log("Active Bookings: " + user.activeBookings);

            // Check car availability
            const carResponse = await axios.get(`${process.env.CAR_SERVICE_URL}/cars/${req.body.carId}`);
            const car = carResponse.data;

            if (!car.isAvailable) {
                console.log("Car availability: " + car.isAvailable);
                return res.status(400).json({ error: 'Car not available' });
            }
            console.log("Car availability: " + car.isAvailable);

            // Create booking
            const booking = new Booking(req.body);
            await booking.save();

            console.log("Booking: " + booking);

            // Update car availability
            await axios.put(`${process.env.CAR_SERVICE_URL}/cars/${req.body.carId}`, {
                isAvailable: false
            });

            console.log("Car's availability has been updated!!!");

            // Update user's active bookings count
            await axios.put(`${process.env.USER_SERVICE_URL}/users/${req.body.userId}`, {
                activeBookings: user.activeBookings + 1
            });

            console.log("User's active bookings count has been updated!!!");

            res.status(201).json(booking);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Get user's bookings
    getUserBookings: async (req, res) => {
        try {
            const bookings = await Booking.find({
                userId: req.params.userId,
                status: 'active'
            });
            res.json(bookings);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Cancel booking
    cancelBooking: async (req, res) => {
        try {
            const booking = await Booking.findOne({ bookingId: req.params.bookingId });
            if (!booking) {
                return res.status(404).json({ error: 'Booking was not found!!!' });
            }

            booking.status = 'cancelled';
            await booking.save();
            console.log("Booking: " + booking);
            console.log("Booking Status:" + booking.status);

            // Update car availability
            await axios.put(`${process.env.CAR_SERVICE_URL}/cars/${booking.carId}`, {
                isAvailable: true
            });

            // Get user's current booking count
            const userResponse = await axios.get(`${process.env.USER_SERVICE_URL}/users/${booking.userId}`);
            const user = userResponse.data;
            console.log("User: " + user);

            // Update user's active bookings count
            await axios.put(`${process.env.USER_SERVICE_URL}/users/${booking.userId}`, {
                activeBookings: user.activeBookings - 1
            });
            console.log("User's active bookings count has been updated!!!");

            res.json({ message: 'Booking canceled successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = bookingController; 