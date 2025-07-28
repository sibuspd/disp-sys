const express = require('express');
const router = express.Router();
const Authentication = require('../Authentication/auth');
const HospitalController = require('../Controllers/nearByHospitalC');

// POST API Calls
router.post('/add', Authentication.adminFacultyAuth, HospitalController.addNearByHospital); // Route to add a new hospital

//GET API Calls
router.get('/get', HospitalController.getAHospitals); // Route to get all nearby hospitals

// PUT API Calls
router.put('/update/:id', Authentication.adminFacultyAuth, HospitalController.updateHospitalById); // Route to update a hospital by ID

// DELETE API Calls
router.delete('/delete/:id', Authentication.adminFacultyAuth, HospitalController.deleteHospitalById); // Route to delete a hospital by ID

module.exports = router;