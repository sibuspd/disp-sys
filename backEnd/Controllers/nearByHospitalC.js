const HospitalModels = require('../Models/nearByHospitals');

// Function to add a new hospital
exports.addNearByHospital = async (req, res) => {
    try{
        const { name, address, contact} = req.body;
        const hospital = new HospitalModels({name,address, contact, addedBy: req.user?._id});
        await hospital.save();
        res.status(201).json({"message": "Hospital added successfully", hospital});
    }
    catch(err){
        console.error(err);
        res.status(500).json({
            error: "Internal Server Error",
            issue: err.message
        });
    }
}

// Function to get all nearby hospitals
exports.getAHospitals = async (req, res) => {
    try{
        const hospitals = await HospitalModels.find().populate('addedBy', 'name').sort({createdAt: -1});
        res.status(200).json({
            message: "Nearby hospitals fetched successfully",
            hospitals: hospitals
        });   
    }
    catch(err){
        console.error(err);
        res.status(500).json({
            error: "Internal Server Error",
            issue: err.message
        });
    }
}

// Function to update a hospital by ID
exports.updateHospitalById = async (req, res) => {
    try{
        const { id } = req.params;
        let body = {...req.body};
        const hospital = await HospitalModels.findByIdAndUpdate(id,{...body, addedBy: req.user?._id}, {new: true});

        if(hospital){
            return res.status(200).json({
                message: "Hospital updated successfully",
                hospital
            });
        }
        return res.status(404).json({
            error: "No such Hospital was found"
        });
    }
    catch(err){
        console.error(err);
        res.status(500).json({
            error: "Internal Server Error",
            issue: err.message
        });
    }
}

// Function to delete a hospital by ID
exports.deleteHospitalById = async (req, res) => {
    try{
        const { id } = req.params;
        const hospital = await HospitalModels.findByIdAndDelete(id);
        if(hospital){
            return res.status(200).json({
                message: "Hospital deleted successfully"
            });
        }
        return res.status(404).json({
            error: "No such Hospital was found"
        });
    }
    catch(err){
        console.error(err);
        res.status(500).json({
            error: "Internal Server Error",
            issue: err.message
        });
    }
}