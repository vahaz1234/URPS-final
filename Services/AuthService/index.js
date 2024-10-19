require('dotenv').config();
const express = require('express');
const cors = require("cors") ;


const connectDB = require("./src/lib/DbConnect");

// Initialize Express
const app = express();
const port = process.env.PORT || 5001;


// Middleware
app.use(cors());
app.use(express.json());

// Database connection
connectDB()


// Routes
app.get("/" , (req , res)=>{
  console.log("hiii")
  return res.json({
    message:"this is working"
  })
})





// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
