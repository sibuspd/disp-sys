const express = require('express'); // Importing express framework
const app = express();  // Creating an instance of express
const cookieParser = require('cookie-parser'); // Importing cookie-parser for handling cookies or saving session data
const cors = require('cors'); // Importing cors for cross-origin resource sharing
require('dotenv').config({path: './.env'}); // Importing dotenv to load environment variables from .env file

// Middlewares-------------------------------------------------------------------------------
app.use(express.json()); // Middleware to parse JSON requests from request body
app.use(cookieParser()); // Middleware to parse cookies from request headers
app.use(cors({
    credentials: true, // Enabling credentials so that cookies can be shared without need to manually send them in headers
    origin: 'http://localhost:5173' // Allowing requests from this origin
})); // Middleware to enable cross-origin resource sharing 

// Establishing MongoDB connection-----------------------------------------------------------
require('./connection');

//Routes-------------------------------------------------------------------------------------
const userRoutes = require('./Routes/userR'); // Importing user routes
app.use('/api/auth', userRoutes); // Mounting user routes under /api/auth

const facilityRoutes = require('./Routes/facilityR'); // Importing facility routes
app.use('/api/facility', facilityRoutes); // Mounting facility routes under /api/facility

const medicineRoutes = require('./Routes/medicineR'); // Importing medicine routes
app.use('/api/medicine', medicineRoutes); // Mounting medicine routes under /api/medicine

const hospitalRoutes = require('./Routes/nearByHospitalR'); // Importing hospital routes
app.use('/api/hospital', hospitalRoutes); // Mounting hospital routes under /api/hospital

const notificationRoutes = require('./Routes/notificationR'); // Importing notification routes
app.use('/api/notification', notificationRoutes); // Mounting notification routes under /api/notification

const galleryRoutes = require('./Routes/galleryR'); // Importing gallery routes
app.use('/api/gallery', galleryRoutes); // Mounting gallery routes under /api/gallery

const historyRoutes = require('./Routes/historyR'); // Importing history routes
app.use('/api/history', historyRoutes); // Mounting history routes under /api/history

// Starting the server----------------------------------------------------------------------
app.listen(process.env.PORT, () => {
    console.log('Server is listening on port- ', process.env.PORT);
});


