const express = require('express');
const router = express.Router();
const UserController = require('../Controllers/userC');
const Authentication = require('../Authentication/auth'); // Importing authentication middleware

//POST API Calls
router.post('/register', UserController.register )
router.post('/login', UserController.login );
router.post('/send-otp', UserController.sendOtp);
router.post('/verify-otp', UserController.verifyOtp);
router.post('/reset-password', UserController.resetPassword);
router.post('/registerStudentByStaff', Authentication.adminFacultyAuth, UserController.registerStudentByStaff); // Only admin or faculty can register students
router.post('/add-staff', Authentication.adminFacultyAuth, UserController.addStaffsByAdmin); // Only admin can add staff
router.post('/logout', Authentication.studentAuth, UserController.logout); // Logout API access for all users

//PUT API Calls
router.put('/update-student/:id', Authentication.adminFacultyAuth, UserController.updateStudentById); // middleware has been passed to check if the user is an admin or faculty before allowing update
router.put('/update-staff/:id', Authentication.adminFacultyAuth, UserController.updateStaffById); // Only admin or faculty can update staff details

// GET API Calls
router.get('/get-student-by-roll/:roll', Authentication.adminFacultyAuth, UserController.getStudentByRollNo); // A student should not be able to access some other roll no other than his own
router.get('/get-staff', UserController.getAllStaffs); // Get all staff members without restricted access

//DELETE API Calls
router.delete('/delete-staff/:id', Authentication.adminFacultyAuth, UserController.deleteStaff); // Only admin can delete staff

module.exports = router;