const mongoose = require("mongoose")
const mongoConfig = require("../config/mongo.config")

async function mongoDB() {
    await mongoose.connect(mongoConfig.url)

    // const db = mongoose.connection;

    // db.on('error', console.error.bind(console, 'connection error:'));
    // db.once('open', () => {
    //     console.log('Connected to MongoDB **');
    // });

    // function checkConnectionStatus() {
    //     switch (mongoose.connection.readyState) {
    //         case 0:
    //             console.log('MongoDB is disconnected');
    //             break;
    //         case 1:
    //             console.log('MongoDB is connected *');
    //             break;
    //         case 2:
    //             console.log('MongoDB is connecting');
    //             break;
    //         case 3:
    //             console.log('MongoDB is disconnecting');
    //             break;
    //         default:
    //             console.log('Unknown MongoDB connection state');
    //     }
    // }

    // // Check the connection status
    // checkConnectionStatus();

    // // Graceful shutdown
    // process.on('SIGINT', async () => {
    //     console.log('SIGINT signal received: closing MongoDB connection');
    //     await mongoose.disconnect();
    //     process.exit(0);
    // });

    // process.on('SIGTERM', async () => {
    //     console.log('SIGTERM signal received: closing MongoDB connection');
    //     await mongoose.disconnect();
    //     process.exit(0);
    // });

}

module.exports = mongoDB