const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
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
    cart:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
        default:[]
    }],
    orders:{
        type:Array,
        default:[]
    },
    contact:{
       type:Number, 
        minlength:[10 , "Contact number must be atleast 10 digits long"],
        validator:[validator.isMobilePhone , "Please provide a valid contact number"],

    },
    address:{
        type:String,
        
    },
    picture:{
        type:String
    }   
    
})

module.exports = mongoose.model("User" , userSchema);