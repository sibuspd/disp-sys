const express = require('express');
const router = express.Router();
const Authentication = require('../Authentication/auth');
const galleryController = require('../Controllers/galleryC');

// POST API Calls
router.post('/add', Authentication.adminFacultyAuth, galleryController.addImage);

// GET API Calls
router.get('/get', galleryController.getAllImages); // Route to get all images

// DELETE API Calls
router.delete('/delete/:id', Authentication.adminFacultyAuth, galleryController.deleteImageById);

module.exports = router;