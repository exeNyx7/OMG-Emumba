const User = require('./userModel');

const userController = {
    // Create new user
    createUser: async (req, res) => {
        try {
            const user = new User(req.body);
            await user.save();
            console.log("User was saved!!!: " + user);
            res.status(201).json(user);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    // Get user by ID
    getUser: async (req, res) => {
        try {
            const user = await User.findOne({ userId: req.params.userId });
            if (!user) {
                return res.status(404).json({ error: 'User was not found!!!' });
            }
            console.log("User was found!!!: " + user);
            res.json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Update user's booking count
    updateBookingCount: async (req, res) => {
        try {
            const user = await User.findOne({ userId: req.params.userId });
            if (!user) {
                return res.status(404).json({ error: 'User was not found!!!' });
            }
            console.log("User was found!!!: " + user);
            user.activeBookings = req.body.activeBookings;
            await user.save();
            console.log("User was updated!!!: " + user);
            res.json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = userController; 