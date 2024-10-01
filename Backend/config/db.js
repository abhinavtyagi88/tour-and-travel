const mongoose = require('mongoose');
require('dotenv').config();


const uri = process.env.MONGO_URI

async function connectToMongoDB() {
    try {
        // Connect to MongoDB
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

        console.log("CONNECTED");
        
        const India = await mongoose.connection.db.collection("India").find({}).toArray();
        global.india = India;
        console.log(India[0].places[0]);

        


    } catch (error) {
        console.error("Error connecting to MongoDB Atlas", error);
    }
}

module.exports = connectToMongoDB;