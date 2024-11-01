const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

const touristPlaces = {
    india: 'india',
    america: 'america',
    china: 'china'
};

router.get('/touristPlace/:country', authMiddleware, async (req, res) => {
    const country = req.params.country.toLowerCase();

    if (!touristPlaces[country]) {
        return res.status(404).json({ message: 'Country not found' });
    }

    try {
        const data = global[touristPlaces[country]];
        if (!data) {
            return res.status(500).send("Tourist Place data not loaded yet.");
        }
        res.send([data]);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;