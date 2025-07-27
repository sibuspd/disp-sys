const express = require('express');
const router = express.Router();

const Authentication = require('../Authentication/auth');
const FacilityController = require('../Controllers/facilityC'); // Importing the FacilityController

// POST API Calls
router.post('/add', Authentication.adminFacultyAuth, FacilityController.addFacility);

module.exports = router;