const Car = require('./carModel');

const carController = {
    // Add new car
    createCar: async (req, res) => {
        try {
            const car = new Car(req.body);
            await car.save();
            console.log(car);
            res.status(201).json(car);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    // Get car by ID
    getCar: async (req, res) => {
        try {
            const car = await Car.findOne({ carId: req.params.carId });
            if (!car) {
                return res.status(404).json({ error: 'Car was not found!!!' });
            }
            console.log(car);
            res.json(car);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Update car availability
    updateCarAvailability: async (req, res) => {
        try {
            const car = await Car.findOne({ carId: req.params.carId });
            if (!car) {
                return res.status(404).json({ error: 'Car was not found!!!' });
            }

            car.isAvailable = req.body.isAvailable;
            await car.save();
            console.log(car);
            res.json(car);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = carController; 