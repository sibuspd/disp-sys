const UserModels = require("../Models/user"); // Importing user model


// Registration function for user
exports.register = async (req, res) => {
  try {
    const { name, email, password, roll } = req.body; // Destructuring request body
    const isExist = await UserModels.findOne({ email }); // Checking if user already exists

    if(isExist){
        return res.status(400).json({ error: "User already exists" });
    }

    // For new User
    const user = new UserModels({ name, email, password, roll }); // Creating a new user instance
    await user.save(); // Saving the user to the database
    res.status(201).json({
      message: "User registered successfully", success: "yes", data: user}); // data object to be sent back to the client    
  } 
  catch (error) {
    res.status(500).json({
      error: "Something went wrong while registering the user",
      issue: error.message,
    });
  }
};
