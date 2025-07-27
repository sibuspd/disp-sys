const MedicineModels  = require('../Models/medicine');

// Function to add medicine
exports.addMedicine = async (req, res) => {
    try{
       const { name, quantity, usage} = req.body;
       const medicine = new MedicineModels({name, quantity, usage, addedBy: req.user._id});
       await medicine.save();
       
       res.status(201).json({ message: 'Medicine added successfully', medicine });

    }
    catch(err){
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}