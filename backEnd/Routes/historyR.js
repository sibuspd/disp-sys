const express = require('express');
const router = express.Router();
const Authentication = require('../Authentication/auth');
const HistoryController = require('../Controllers/historyC');

// POST API Calls
router.post('/add', Authentication.adminFacultyAuth, HistoryController.addHistory); 

module.exports = router;