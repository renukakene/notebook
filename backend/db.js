const mongoose = require('mongoose');

const mongoURI = "mongodb://renukakene:renu2004@ac-wkqxqe5-shard-00-00.2yma42c.mongodb.net:27017,ac-wkqxqe5-shard-00-01.2yma42c.mongodb.net:27017,ac-wkqxqe5-shard-00-02.2yma42c.mongodb.net:27017/notebook?ssl=true&replicaSet=atlas-vo16mp-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0";

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log("Connection failed");
        console.error(error);
    }
}

module.exports = connectToMongo;