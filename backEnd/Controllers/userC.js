// API creation for User related functionalities

const UserModels = require("../Models/user"); // Importing user model
const bcryptjs = require("bcryptjs"); // Importing bcryptjs for password hashing

// Registration function for user
exports.register = async (req, res) => {
  try {
    const { name, email, password, roll } = req.body; // Destructuring request body
    const isExist = await UserModels.findOne({ email }); // Checking if user already exists

    if(isExist){
        return res.status(400).json({ error: "User already exists" });
    }

    // Hashing the password
    const hashedPassword = await bcryptjs.hash(password, 10); // Hashing password with 10 rounds

    // For new User
    const user = new UserModels({ name, email, roll , password: hashedPassword }); // Creating a new user instance
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

// Login function for user
exports.login = async (req, res) => {
    try{
        const { email, password } = req.body; // Destructuring request body
        const isExist = await UserModels.findOne({ email }); // Returns user object if exists or else null
        
        // Verifies both email and password
        if(isExist && await bcryptjs.compare(password, isExist.password)){
            return res.json({ message: "User logged in successfully", success: "true", user: isExist });
        }
        else{
            return res.status(400).json({ error: "Invalid credentials" });
        }
    }
    catch(error){
        res.status(500).json({
            error: "Something went wrong while logging in",
            issue: error.message,
        });
    }
}