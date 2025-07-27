const express = require('express');
const router = express.Router();
const Authentication = require('../Authentication/auth');
const MedicineController = require('../Controllers/medicineC');

// POST API Calls
router.post('/add', Authentication.adminFacultyAuth, MedicineController.addMedicine);

//GET API Calls
router.get('/get', Authentication.adminFacultyAuth, MedicineController.getMedicine);

// PUT API Calls
router.put('/update/:id', Authentication.adminFacultyAuth, MedicineController.updateMedicineById);

module.exports = router;
