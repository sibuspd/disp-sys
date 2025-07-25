const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        default:"student"
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
    },
    roll:{
        type:String,
    },
    mobileNo:{
        type:String,
        default:""

    },
    fatherName:{
        type:String,        
        default:""
    },
    fatherMobile:{
        type:String,
        default:""
    },
    address:{
        type:String,
        default:""
    },
    previous_health:{
        type:String,
        default:""
    },
    age:{
        type:String,
        default:""
    },
    bloodGroup:{
        type:String,
        default:""
    },
    designation:{
        type:String,
        default:""
    },
    resetPasswordToken:{
        type:String,
    },
    resetPasswordExpires:{
        type:Date
    }
},{timestamps:true})

const userModel = mongoose.model("user",UserSchema);
module.exports = userModel;