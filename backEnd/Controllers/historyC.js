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

// Get all records by Year/Month
exports.getHistory = async (req, res) => {
    try{
        let {month, year} = req.query; // Extracting month and year from query parameters
        
        // Finding the corresponding month number of current month 
        const monthIndex = new Date(`${month} 1, ${year}`).getMonth(); // Converting month name to month index (0-11)

        // Calculating start and end date of the month
        const startDate = new Date(year, monthIndex, 1);
        const endDate = new Date(year, monthIndex +1, 1);

        // Finding history by date i.e., records that are created greater than/after start date and less than/before end date    
        const history = await HistoryModel.find({
            createdAt: {$gte: startDate, $lt: endDate} // Filtered history by date range
        }).populate("student").sort({createdAt: -1}); // Descending order of creation date

        return res.status(200).json({
            message: 'Records fetched successfully',
            history
        });

    }
    catch(err){
        console.log(err);
        res.status(500).json({
            error: 'Internal Server Error',
            issue: err.message
        });
    }
}
