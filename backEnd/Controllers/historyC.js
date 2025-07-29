const HistoryModel = require("../Models/history");
const MedicineModel = require("../Models/medicine"); // Importing MedicineModel to update the medicine quantity in records

// Add a new history of a user
exports.addHistory = async (req, res) => {
    try{
        let {roll, student, medicines} = req.body; // Here medicines is an array of medicine objects corresponding to  the user
        
        // Medicines array is extracted from frontend
        let medicineData = medicines.map((item)=> {
            let {_id, name, requiredQuantity} = item;
            return {_id, name, requiredQuantity}; // Return an array of medicine objects through 'medicineData'
        });

        // Finding the mentioned medicine and updating the original quantity after usage
        medicineData.map( async(item) => {
            let medicineData = await MedicineModel.findById(item._id); // Checking the medicine mentioned in our DB collection by Id

            let leftQuantity = parseInt(medicineData.quantity) - parseInt(item.requiredQuantity); // Calculating the remaining quantity of the medicine
            medicineData.quantity = leftQuantity.toString(); // Updating quantity to remaining quantity of the medicine
            await medicineData.save();
        });

        const addData = new HistoryModel({roll, student, medicines}); // Creating a new history object for user
        await addData.save(); // Saving the history object to DB
        res.status(201).json({message: 'History added successfully'});  
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            error: 'Internal Server Error',
            issue: err.message
        });
    }
}
