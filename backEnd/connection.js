const mongoose = require('mongoose') // Importing mongoose for MongoDB connection
const dotenv = require('dotenv') // Importing dotenv for loading environment variables

const mongoDBURL = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.wkdzkh5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0` ; // Add your database URL

// Connecting to MongoDB using mongoose
mongoose.connect(mongoDBURL)
    .then(res=>{
        console.log("Connected to MongoDB database")
}).catch(err=>{
        console.log(err)
})

