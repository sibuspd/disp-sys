const FacilityModel = require('../Models/facility'); // Importing FacilityModel to interact with the database

/**FacilityModel would contain properties - title, description and addedBy.
 * title and description would be extracted from request body
 * addedBy would be extracted from req.user_id which is set in the authentication middleware.
 * A user object is returned inside the authentication middleware function which contains userId.
 */
exports.addFacility = async (req, res) => {
    try{
        let body = {...req.body}; // Extracting body from request by destructuring - Facility contains Title and Description
        const facility = new FacilityModel({...body, addedBy: req.user._id});
        await facility.save();

        res.status(201).json({message: "Facility added successfully", facility: facility});
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ 
            error: "Internal Server Error",
            issue: error.message });
    }
}

// Update Facility
exports.updateFacility = async (req, res) => {
    try{
        const {id} = req.params;
        const facility = await FacilityModel.findByIdAndUpdate(id, {...req.body, addedBy: req.user._id}, {new: true});

        return res.status(200).json({message: "Facility updated successfully", facility: facility});
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ 
            error: "Internal Server Error",
            issue: error.message });
    }
}

// Get all Facilities
exports.getFacility = async (req, res) => {
    try{
        const facility = await FacilityModel.find().populate("addedBy","name").sort({createdAt: -1}); // Fetching all facilities and populating the addedBy field with user details | only "name" is populated to reduce data transfer
        // createdAt: -1 sorts the facilities in descending order based on creation time
        res.status(200).json({ message: "Facilities fetched successfully", facilities: facility });
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            error: "Internal Server Error",
            issue: err.message
        });
    }
}

// Delete Facility through Admin
exports.deleteFacility = async (req, res) => {
    try{
        const {id} = req.params;
        const facility = await FacilityModel.findByIdAndDelete(id);

        if(facility){
            return res.status(200).json({message: "Facility deleted successfully", facility: facility});
        }

        return res.status(404).json({
            error: "Facility not found",
            message: "No facility found with the provided ID"
        });

    }
    catch(err){
        console.log(err);
        res.status(500).json({
            error: "Internal Server Error",
            issue: err.message
        });
    }
}
