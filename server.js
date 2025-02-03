const express = require('express');
const app = express();
const db = require('./db');

const bodyParser = require("body-parser");
app.use(bodyParser.json());




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
app.listen(3000,()=>{
    console.log("server is running at: http://localhost:3000")
});