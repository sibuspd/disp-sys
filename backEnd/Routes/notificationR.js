const express = require('express');
const router = express.Router();
const Authentication = require('../Authentication/auth');
const notificationController = require('../Controllers/notificationC');

// POST API Calls
router.post('/add', Authentication.adminFacultyAuth, notificationController.addNotification);

// GET API Calls
router.get('/get', notificationController.getNotifications);

// DELETE API Calls
router.delete('/delete/:id',Authentication.adminFacultyAuth, notificationController.deleteNotificationById);

module.exports = router;