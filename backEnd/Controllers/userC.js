// API creation for User related functionalities

const UserModels = require("../Models/user"); // Importing user model
const bcryptjs = require("bcryptjs"); // Importing bcryptjs for password hashing
const jwt = require("jsonwebtoken"); // Importing jsonwebtoken for token generation
const crypto = require("crypto"); // Importing crypto for generating OTPs
const nodemailer = require("nodemailer"); // Importing nodemailer for sending emails
const { text } = require("stream/consumers");
const { info } = require("console");


// Cookie Configuration
const cookieConfig = {
  httpOnly: true, // Cookie is not accessible via JavaScript
  secure: false, // Set to true if using HTTPS - In production mode
  sameSite: 'Lax' // Cookie is sent only for same-site requests
}

// Nodemailer transporter configuration for Sender's Server
const transporter = nodemailer.createTransport({
  service: 'gmail', // Using Gmail as the email service
  auth: {
    user: process.env.EMAIL, // Sender's email address
    pass: process.env.EMAIL_PASSWORD
  }
}); 

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

// OTP generation function
exports.sendOtp = async (req, res) => {
  try{
    const {email} = req.body; // Extracting email from request body
    const user = await UserModels.findOne({ email }); // Finding if user already exists
    
    if(!user){
      return res.status(404).json({ error: "User not found in database" });
    }
    else{
      const buffer = crypto.randomBytes(4); // Generating 4 random bytes
      const token = buffer.readUInt32BE(0) % 900000 + 100000; // Converting bytes to a 6-digit OTP

      user.resetPasswordToken = token; // Saving the OTP in user model
      user.resetPasswordExpires = Date.now() + 3600000; // Setting expiry time as 1 hour from now

      await user.save(); // Saving the updated user model

      // Email Layout for sending OTP
      const mailOptions = {
        from: process.env.EMAIL, // Sender's email address
        to: email, // Client's email address for password reset
        subject: 'Password Reset OTP',
        text: `Your OTP for password reset is ${token}. It is valid for 1 hour.`
      }

      // Handling the transporter promise object for sending email
      transporter.sendMail(mailOptions, (error, info) => {
        if(error){
          return res.status(500).json({
            error: "Error in Server",
            issue: error.message,
          });
        }
        else{
          res.status(200).json({
            message: "OTP sent successfully to your email",
          });
        }
      });

    }
  }
  catch(error){
    res.status(500).json({
      error: "Something went wrong while sending OTP",
      issue: error.message,
    });
  }
}