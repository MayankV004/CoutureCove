const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    image:Buffer,
    name:{
        type:String,
        required:[true , "Please provide a name"]
    },
    price:{
        type:Number,
    },
    discount:{
        type:Number,
        default:0
    },
    bgcolor:{
        type:String,
        default:"white"
    },
    panelcolor:{
        type:String,
        default:"white"
    },
    textcolor:{
        type:String,
        default:"black"
    },


});

module.exports = mongoose.model("Product" , productSchema);