const mongoose = require('mongoose')


const mongoDBURL = "" ; // Add your database URL
mongoose.connect(mongoDBURL)
    .then(res=>{
        console.log("DataBase Connected Successfully")
}).catch(err=>{
        console.log(err)
})

