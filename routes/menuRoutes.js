const express = require('express');
const router = express.Router();
const MenuItem = require("./../Models/menu");



// POST method to add data of menu
router.post('/',async(req,res)=>{
    try{
     const data = req.body;
    const newMenuItem = new MenuItem(data);

    const response = await newMenuItem.save();
    console.log('data is saved');
    res.status(200).json({response});

    }catch(err){
        console.log(err);
        res.status(500).json({error:"Internal Server Error"});

    }
    
})

// GET method to get the data of menu
router.get('/',async(req,res)=>{
    try{
       const data =  await MenuItem.find();
        console.log('data is fetched');
        res.status(200).json(data);

    }catch(err){
        console.log(err);
        res.status(500).json({error:"Internal Server Error"});
    }
   
});

// GET method to get the data based on tastetype
router.get('/:tastetype',async(req,res)=>{
    const tastetype = req.params.tastetype;
    try{
        if(tastetype == 'sweet' || tastetype == 'spicy' || tastetype == 'sour' ){
            response = await MenuItem.find({taste:tastetype});
            console.log('response fetched');
            res.status(200).json(response);
        }else{
            res.status(404).json({error:"Invalid taste type"});
        }
        
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});

    }
})

router.put('/:id',async(req,res)=>{
    try{
    const menuitemid = req.params.id;
    const menuitemdata = req.body;
    const respone = await MenuItem.findByIdAndUpdate(menuitemid,menuitemdata,{
        new: true,
        runValidators:true,
    });
    if(!respone){
        return res.status(404).json({error:"Menu item not found!"});
    }
    console.log('data is updated');
    res.status(200).json(respone);
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Internal Server Error!"});
    }


})

router.delete('/:id',async(req,res)=>{
    try{
    const menuitemid = req.params.id;

    const response = await MenuItem.findByIdAndDelete(menuitemid);
    if (!response){
        return res.status(404).json({error:"Person not found"});
    }
    console.log('data deleted');
    res.status(200).json({message:"person Deleted successfully"})

    }catch(err){
        console.log(err);
        res.status(500).json({error:"Internal Server Error"});

    }

});

// -------------------------------------------------------------------------
// export router into server.js file.
module.exports = router;