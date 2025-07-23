const express = require('express'); // Importing express framework
const app = express();  // Creating an instance of express

app.use(express.json()); // Middleware to parse JSON requests from request body

// Establishing MongoDB connection
require('./connection');

//Using Routes
const userRoutes = require('./Routes/userR'); // Importing user routes
app.use('/api/auth', userRoutes); // Mounting user routes under /api/auth

// Starting the server
app.listen(4000, () => {
    console.log('Server is listening on port 4000');
});


