const express = require('express');
const router = express.Router();
const Authentication = require('../Authentication/auth');
const MedicineController = require('../Controllers/medicineC');

router.post('/add', Authentication.adminFacultyAuth, MedicineController.addMedicine);

module.exports = router;
