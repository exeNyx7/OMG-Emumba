const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const carController = require('./carController');

dotenv.config();
const app = express();

app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
// Routes
app.post('/cars', carController.createCar);
app.get('/cars/:carId', carController.getCar);
app.put('/cars/:carId', carController.updateCarAvailability);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Car Service running on port ${PORT}`);
}); 