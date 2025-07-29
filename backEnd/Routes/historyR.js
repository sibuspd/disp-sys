const express = require('express');
const router = express.Router();
const Authentication = require('../Authentication/auth');
const HistoryController = require('../Controllers/historyC');

// POST API Calls
router.post('/add', Authentication.adminFacultyAuth, HistoryController.addHistory); 

// GET API Calls
router.get('/get-history', Authentication.adminFacultyAuth, HistoryController.getHistory);

module.exports = router;