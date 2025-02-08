const express = require('express');
const app = express();
const db = require('./db');
require('dotenv').config();
const passport = require('./auth');
  

const bodyParser = require("body-parser");
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;

// Middleware function
const logRequest = (req,res,next) =>{
    console.log(`${new Date().toLocaleString()} Request Made to : ${req.originalURL}`);
    next();
}

app.use(logRequest);




app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local',{session:false});

app.get('/',(req,res)=>{
    res.send("Welcom to our Hotel!");

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