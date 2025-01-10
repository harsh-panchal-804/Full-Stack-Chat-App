const express = require('express');
const router = express.Router();
const messageController = require('../controllers/message.controller.js');
const protectRoute = require('../middleware/auth.middleware.js');
router.get("/users",protectRoute,messageController.getUsersForSidebar)
router.get("/:id",protectRoute,messageController.getMessages)
router.post("/send/:id",protectRoute,messageController.sendMessage)




module.exports = router;