const express = require('express');
const router = express.Router();
const Authentication = require('../Authentication/auth');
const MedicineController = require('../Controllers/medicineC');

// POST API Calls
router.post('/add', Authentication.adminFacultyAuth, MedicineController.addMedicine);

//GET API Calls
router.get('/get', Authentication.adminFacultyAuth, MedicineController.getMedicine);
router.get('/search-by-name', MedicineController.searchMedicine); // Search by name endpoint

// PUT API Calls
router.put('/update/:id', Authentication.adminFacultyAuth, MedicineController.updateMedicineById);

// DELETE API Calls
router.delete('/delete/:id', Authentication.adminFacultyAuth, MedicineController.deleteMedicineById); // Assuming deleteMedicineById is defined in the controller);

module.exports = router;
