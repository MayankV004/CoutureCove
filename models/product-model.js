const { text } = require("express");
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    image :{
        type:String,
        required:[true , "Please provide an image"]
    },
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
    bgColor:{
        type:String,
        default:"white"
    },
    panelColor:{
        type:String,
        default:"white"
    },
    textColor:{
        type:String,
        default:"black"
    },


});

module.exports = mongoose.model("Product" , productSchema);