const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userController = require('./userController');

dotenv.config();
const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Routes
app.post('/users', userController.createUser);
app.get('/users/:userId', userController.getUser);
app.put('/users/:userId', userController.updateBookingCount);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`User Service running on port ${PORT}`);
});