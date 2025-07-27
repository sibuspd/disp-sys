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