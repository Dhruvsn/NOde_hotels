const express = require('express');
const router = express.Router();
const Person = require("./../Models/Person.js");


// POST route to add a person

router.post('/', async(req,res)=>{

    try{
        const data = req.body; // Assuming the request body contains the person data

        // Create a new Person document using the Mongoose Model
        const newPerson = new Person(data);

        // Save the new person to the database
        const response = await newPerson.save();
        console.log('data saved');
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Internal Server Error"});
    }
    
});



// GET method to get the person
router.get('/', async(req,res)=>{
    try{
        const data = await Person.find();
        console.log('data fetched');
        res.status(200).json(data);

    }catch(err){
        console.log(err);
        res.status(500).json({error:"Internal Server Error"});

    }
})





//GET method to get the person detail based on worktype
router.get('/:worktype',async(req,res)=>{
    const worktype = req.params.worktype;

    try{
        if(worktype == 'chef' || worktype == 'manager' || worktype=='waiter'){

            const response = await Person.find({work:worktype});
            console.log('response fetched');
            res.status(200).json(response);

        }else{
            res.status(404).json({error:'Invalid work Type'});
        }

    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
       
    }
   
});

router.put('/:id',async(req,res)=>{
    try{
        const personid = req.params.id;  // Extract the id from the URL parameter
        const updatedPersonData = req.body; // updated data from the person
        const response = await Person.findByIdAndUpdate(personid,updatedPersonData,{
            new: true,  // Return the updated document
            runValidators:true, // Run Mongoose validation
        })
        console.log('data updated');
        res.status(200).json(response);

        if(!response){
            return res.status(404).json({error:"Person not found"});
        }

    }catch(err){
        console.log(err);
        res.status(500).json({error:"Internal Server Error"});
    }
})


router.delete('/:id',async(req,res)=>{
    try{
        const personid = req.params.id; // Extract the person's ID from the URL parameter

        const deletePerson = await Person.findByIdAndDelete(personid);

        if (!deletePerson){
            return res.status(404).json({error:"Person not found"});
        }
        console.log('data deleted');
        res.status(200).json({message:"person Deleted successfully"});

    }catch(err){
        console.log(err);
        res.status(500).json({error:"Internal Server Error"});
    }
    

})



// export rrouter
module.exports = router;