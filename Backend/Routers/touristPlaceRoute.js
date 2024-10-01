const express = require('express');
const router = express.Router();

router.get('/touristPlace/:country', async (req, res) => {
    const country = req.params.country.toLowerCase();
    const c = country.slice(1);
    
  
    switch (c) {
      case 'india':
        try {
            if (!global.india) {
                return res.status(500).send("toursist Place data not loaded yet.");
            }
            else
            
            res.send([global.india]); 
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Server Error");
        }
        break;
      case 'america':
        try {
            if (!global.america) {
                return res.status(500).send("toursist Place data not loaded yet.");
            }
            else
            
            res.send([global.location]); 
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Server Error");
        }
        break;
      case 'china':
        try {
            if (!global.china) {
                return res.status(500).send("toursist Place data not loaded yet.");
            }
            else
            
            res.send([global.location]); 
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Server Error");
        }
        break;
      default:
        return res.status(404).json({ message: 'Country not found' });
    }})
module.exports = router;