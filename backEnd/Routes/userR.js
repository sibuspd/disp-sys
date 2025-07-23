const express = require('express');
const router = express.Router();
const UserController = require('../Controllers/userC');

router.post('/register', UserController.register )

module.exports = router;