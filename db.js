const { default: mongoose } = require("mongoose");
require('dotenv').config();


// Define the MongoDB connection URL

const mongoURL = process.env.DB_URL;

// Set up MongoDB connection
mongoose.connect(mongoURL,{
    useNewUrlParser: true,
    // useUnifiedTopology: true
})


// Get the defauld connection
// Mongoose maintains a default connection obj representing the MongoDB connection.
const db = mongoose.connection;

// Define event listeners for database connection
db.on("connected",()=>{
    console.log("Connected to MongoDB server.");
})

db.on('error',(err)=>{
    console.error("MongoDb connection error:", err);
})

db.on('disconnected',()=>{
    console.log('MongoDB disconnected');
})


// Export the database connection
module.exports = db;    