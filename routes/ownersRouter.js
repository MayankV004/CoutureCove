const express = require('express');
const router = express.Router();
const ownerModel = require("../models/owner-model"); 
const isLoggedIn = require('../middleware/isLoggedIn');
require('dotenv').config();


if(process.env.NODE_ENV === "development"){
    router.post("/create" ,async (req , res)=>{
        let owners = await ownerModel.find(); // Checking if owner already Exists
        if(owners.length > 0){
            return res
            .status(503)
            .send("You dont have permission to create a new owner")
        }
        let {fullname , email , password} = req.body;
        let createdOwner = await ownerModel.create({
            fullname,
            email,
            password
        })
        res.status(200).send("We can create a new OWner")
    })
}


router.get("/admin" , isLoggedIn ,async (req , res) => {
    let success = req.flash("success")
    res.render("createproducts" , {success} );
})

router.post("/");


module.exports = router;

