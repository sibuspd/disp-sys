// API creation for User related functionalities

const UserModels = require("../Models/user"); // Importing user model
const bcryptjs = require("bcryptjs"); // Importing bcryptjs for password hashing
const jwt = require("jsonwebtoken"); // Importing jsonwebtoken for token generation

// Cookie Configuration
const cookieConfig = {
  httpOnly: true, // Cookie is not accessible via JavaScript
  secure: false, // Set to true if using HTTPS - In production mode
  sameSite: 'Lax' // Cookie is sent only for same-site requests
}

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
          const token = jwt.sign({ userId: isExist._id}, 'SECRET_KEY', ) // Generating JWT token
          res.cookie('token', token, cookieConfig); // Saving the token in cookie

            return res.status(200).json({ message: "User logged in successfully", success: "true", user: isExist, token: token }); // Sending response back to client with user data and token
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