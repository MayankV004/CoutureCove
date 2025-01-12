const mongoose = require("mongoose");
const validator = require("validator");

const ownerSchema = new mongoose.Schema({
    fullname : {
        type: String,
        required:[true , "Please tell us your name!"],
        trim:true,
        minlength:[3 , "Name must be atleast 3 characters long"],
    },
    email : {
        type:String,
        required:[true , "Please provide your email"],
        validate:[validator.isEmail , "Please provide a valid email"],
        unique:true,
    },
    password :{
        type:String,
        required:[true , "please provide a password!"],
        select:false, //Password will not be shown in any output
        minlength:[8 , "Password must be atleast 8 characters long"]
        // To see password in output use .select('+password') in query
    },
    products:{
        type:Array,
        default:[]
    },
    picture:{
        type:String
    },
    gstin:{
        type:String
    }   
    
})

module.exports = mongoose.model("Owner" , ownerSchema);