const express = require('express');
const router = express.Router();
const UserController = require('../Controllers/userC');

router.post('/register', UserController.register )
router.post('/login', UserController.login );
router.post('/send-otp', UserController.sendOtp);
router.post('/verify-otp', UserController.verifyOtp);

module.exports = router;