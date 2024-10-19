require('dotenv').config();
const mongoose = require("mongoose")

// Get MongoDB URI from environment variables
const uri = process.env.MONGO_URI



async function connectDB() {
  try {
    // Connect the client to the server
    mongoose.connect(uri, {
         // Use the new URL parser
     // Use the new Server Discover and Monitoring engine
    })
      .then(() => {
        console.log('Successfully connected to MongoDB');
      })
      .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
      });
    
    // Handling the initial connection error
    mongoose.connection.on('error', (err) => {
      console.error('Initial MongoDB connection error:', err);
    });
    
    // Handling disconnections
    mongoose.connection.on('disconnected', () => {
      console.warn('MongoDB connection lost. Trying to reconnect...');
      mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }).catch(err => console.error('Reconnection attempt failed:', err));
    });
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit the process if there is an error
  }
}

// Export the function to be used elsewhere in the application
module.exports = connectDB;
