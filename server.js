const express = require('express');
const app = express();
const db = require('./db');
require('dotenv').config();

const bodyParser = require("body-parser");
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;




app.get('/', (req,res)=>{
    res.send("hello world")

});




// Import router files
const menuRoutes =require("./routes/menuRoutes");
const personRoutes = require('./routes/personRoutes');




//Use the routers
app.use('/person',personRoutes);
app.use('/menu',menuRoutes);


// listen server.
app.listen(PORT,()=>{
    console.log("server is running at: http://localhost:3000")
});