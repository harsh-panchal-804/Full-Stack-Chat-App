const Message = require('../models/message.model.js');
const userModel = require('../models/user.models.js');
const cloudinary = require("../lib/cloudinary");
const { getReceiverSocketId,io } = require('../lib/socket.js');
const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await userModel.find({ _id: { $ne: loggedInUserId } }).select("-password");
        res.status(200).json(filteredUsers);
    }
    catch (error) {
        console.log("error in get users for sidebar", error);
        res.status(500).send("Error in get users for sidebar");
    }

}
const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const myId = req.user._id;

        const messages = await Message.find({
            $or: [
                { senderId: myId, receiverId: userToChatId },
                { senderId: userToChatId, receiverId: myId },
            ],
        });

        res.status(200).json(messages);
    } catch (error) {
        console.log("Error in getMessages controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};


const sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;
        let imageUrl;
        if (image) {
            // Upload base64 image to cloudinary
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }
        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl,
          });
      
        await newMessage.save();
        /// real time functionality
        const receiverSocketId=getReceiverSocketId(receiverId)
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage",newMessage);
        }
        res.status(200).json(newMessage);
    }
    catch (error) {
        console.log("error in send message", error);
        res.status(500).send("Error in send message");
    }
}
module.exports = {
    getUsersForSidebar,
    getMessages,
    sendMessage
};