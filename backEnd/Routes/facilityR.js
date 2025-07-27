const express = require('express');
const router = express.Router();

const Authentication = require('../Authentication/auth');
const FacilityController = require('../Controllers/facilityC'); // Importing the FacilityController
const facilityModel = require('../Models/facility');

// POST API Calls
router.post('/add', Authentication.adminFacultyAuth, FacilityController.addFacility);

//PUT API Calls
router.put('/update/:id', Authentication.adminFacultyAuth, FacilityController.updateFacility);

//GET API Calls
router.get('/get', FacilityController.getFacility); // All users can access this route to get all facilities

//DELETE API Calls
router.delete('/delete/:id', Authentication.adminFacultyAuth, FacilityController.deleteFacility); // Only admin or faculty can delete a facility

module.exports = router;