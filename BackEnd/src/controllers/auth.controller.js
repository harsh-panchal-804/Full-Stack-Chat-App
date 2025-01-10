const User = require('../models/user.models.js');
const bcrypt = require('bcryptjs');
const {generateToken} = require('../lib/utils.js');
const cloudinary = require('../lib/cloudinary.js');
const signup = async(req, res) => {
    const {email,fullName,password} = req.body;
    if(!email || !fullName || !password){
        return res.status(400).send("Please provide all the fields");
    }
    try{
       if(password.length < 6){
        return res.status(400).send("Password should be atleast 6 characters");
       }
       const user1 = await User.findOne({email});
       if(user1){
           return res.status(400).send("Email already exists");
       }
       
       const salt=await bcrypt.genSalt(10);
       const hash=await bcrypt.hash(password,salt);
       const user = new User({email,fullName,password:hash});
       if(user){
            const token = await generateToken(user._id,res);
            await user.save();
            res.status(201).json({
                _id:user._id,
                fullName:user.fullName,
                email:user.email,
                profilePic:user.profilePic,
            });
       }
       else{
           res.send("Invalid user data");
       }
      
    }
    catch(error){
        console.log("error in signup",error);
        res.status(500).send("Error in signup");
    }
};

const login = async (req, res) => {
    const {email,password} = req.body;
    if(!email || !password){
        return res.status(400).send("Please provide all the fields");
    }
    try{
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).send("Invalid email");
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).send("Invalid password");
        }
        const token = await generateToken(user._id,res);
        res.status(200).json({
            _id:user._id,
            fullName:user.fullName,
            email:user.email,
            profilePic:user.profilePic,
        });
    }
    catch(error){
        console.log("error in login",error);
        res.status(500).send("Error in login");
    }   

};

const logout = (req, res) => {
   try{
        res.clearCookie('jwt');
        res.status(200).send("Logged out successfully");
    }
   catch(error){
       console.log("error in logout",error);
       res.status(500).send("Error in logout");
   }
};
const updateProfile = async (req, res) => {
        try{
            const {profilePic} = req.body;
            const user = await User.findById(req.user._id);
            if(!user){
                return res.status(401).send("Unauthorized");
            }
            if(!profilePic){
                return res.status(400).send("Please provide profile pic");
            }
            const uploadResponse=await cloudinary.uploader.upload(profilePic)
            const updatedUser = await User.findByIdAndUpdate(req.user._id,{profilePic:uploadResponse.secure_url},{new:true});
            res.status(200).json(updatedUser)
        }
        catch(error){
            console.log("error in update profile",error);
            res.status(500).send("Error in update profile");
        }
}   
const checkAuth = async (req, res) => {
    try{
        res.status(200).json(req.user);
    }
    catch(error){
        console.log("error in check auth",error);
        res.status(500).send("Error in check auth");
    }
}

module.exports = {
    signup,
    login,
    logout,
    updateProfile,
    checkAuth
};