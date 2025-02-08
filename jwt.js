const jwt = require('jsonwebtoken');


const jwtAuthMiddleware = (req,res,next)=>{

    // First check request headers has authorization or not
    const authorization = req.headers.authorization;
    if(!authorization) return res.status(401).json({error: 'Invalid token'} );

    //Extract the jwt token from the request headers
    const token = req.headers.authorization.split(' ')[1];
    if(!token) return res.status(401).json({error: 'unauthorized'});

    try{
        //verify the token
         const decoded = jwt.verify(token, process.env.JWT_SECRET);

         // Attach  user info to the request object
         req.userPayload = decoded
         next();
    }catch(err){
        console.log('err: ',err);
        res.status(401).json({error: 'Invalid token'} );

    }
}

//Function to generate JWT Token:
const generateToken = (userData)=>{
    //Generate a new JWT token  using user data
    return jwt.sign(userData,process.env.JWT_SECRET,{expiresIn:30000});

}

module.exports = {jwtAuthMiddleware, generateToken};