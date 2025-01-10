const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller.js');
const protectRoute = require('../middleware/auth.middleware.js');

router.post("/signup",authController.signup)
router.post("/login",authController.login)
router.post("/logout", authController.logout)
router.put("/update-profile",protectRoute,authController.updateProfile)
router.get("/check",protectRoute,authController.checkAuth)

module.exports = router;