const jwt = require("jsonwebtoken"); // For decoding JWT tokens
const UserModels = require("../Models/user");

// Login Authentication Middleware for Students/Admin/ All User Roles
exports.studentAuth = async (req, res, next) => {
    try{
        // Cookie is saved in client's browser as soon as user logs in
        const token = req.cookies.token; // Extracting token from cookies

        if(token){
            const decoded = jwt.verify(token, 'SECRET_KEY'); // Verifying the token with secret key
            // decode is an object now containing userId and other data
            req.user = await UserModels.findById(decoded.userId).select("-password"); // Fetching user data excluding password
            next(); // Proceed to the next middleware 
        }
        else {
            return res.status(401).json({ error: "Authentication token not found" });
        }
    }
    catch(err){
        res.status(401).json({
            error: "Authentication error",
            issue: err.message,
        });
    }
}

// Authentication exlusive for College Staff / Access to additional functionality
exports.adminFacultyAuth = async (req, res, next) => {
    try{
        const token = req.cookies.token;
        if(token){
            const decoded = jwt.verify(token, 'SECRET_KEY');
            req.user = await UserModels.findById(decoded.userId).select("-password");

            if(req.user?.role === 'student'){
                throw new Error("You don't have permission to access this page");
            }

            next();
        }
        else{
            return res.status(401).json({ error: "No token, Authentication denied" });
        }
    }
    catch(err){
        res.status(500).json({
            error: "Something went wrong while authenticating",
            issue: err.message,
        });
    }
}