const jwt = require('jsonwebtoken');
const User = require('../models/user.models.js');
const protectRoute = async (req,res,next) => {
    try{
        const token = req.cookies.jwt;
        if(!token){
            return res.status(401).send("Unauthorized");
        }
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId).select("-password");
        if(!user){
            return res.status(401).send("Unauthorized");
        }
        req.user = user;
        next();
    }
    catch(error){
        console.log("error in auth middleware",error);
        res.status(500).send("Error in auth middleware");
    }
}
module.exports = protectRoute;