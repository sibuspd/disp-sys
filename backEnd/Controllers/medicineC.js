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

// Function to get all medicines
exports.getMedicine = async (req, res) => {
    try{
        const medicines = await MedicineModels.find().populate('addedBy','name').sort({createdAt: -1});
        return res.status(200).json({
            message: 'Medicines retrieved successfully',
            medicines: medicines
        });
    }
    catch(err){
        console.error(err);
        res.status(500).json({ 
            err: 'Internal server error',
            issue: err.message
         });
    }
}

// Function to update medicine
exports.updateMedicineById = async (req, res) => {
    try{
        const { id } = req.params;
        const body = {...req.body};

        const medicine = await MedicineModels.findByIdAndUpdate(id, {...body, addedBy: req.user._id}, {new:true});
        if(medicine){
            return res.status(200).json({
                message: 'Medicine updated successfully',
                medicine: medicine
            });
        }
        return res.status(404).json({ error: 'No such Medicine exists in the database'});
    }
    catch(err){
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// Function to search medicine by name
exports.searchMedicine = async (req, res) => {
    try{
        const {name} = req.query; // Search query parameter
        const medicine = await MedicineModels.find({ name: {$regex: '^'+name, $options:'i'} }).populate("addedBy", "name").sort({createdAt: -1}); // Case-insensitive search for medicines starting with the given name

        return res.status(200).json({
            message: 'Medicines retrieved successfully',
            medicines: medicine
        });
    }
    catch(err){
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// Function to delete medicine by ID
exports.deleteMedicineById = async (req, res) => {
    try{
        const { id } = req.params;
        const medicine = await MedicineModels.findByIdAndDelete(id);
        
        if(medicine){
            return res.status(200).json({
                message: 'Medicine deleted successfully',
                medicine: medicine
            });
        }
        return res.status(404).json({ error: 'No such Medicine exists in the database' });
    }
    catch(err){
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}