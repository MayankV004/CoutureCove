const express = require('express');
const router = express.Router();
const productModel = require("../models/product-model");
const isLoggedIn = require("../middleware/isLoggedIn");
const userModel = require('../models/user-model');
router.get("/", (req, res) => {
    let message = req.flash("message");
    let error = req.flash("error");
    res.render("index" , {message , error , loggedIn : false});
});

router.get("/shop" , isLoggedIn , async (req, res) =>{
    let products = await productModel.find();
    res.render('shop', {products});
    
})

router.get("/logout" , isLoggedIn , (req , res) =>{
    res.render("shop")
})

router.get("/addtocart/:id" , isLoggedIn , async (req, res)=>{
    const user = await userModel.findOne({email: req.user.email});
    user.cart.push(req.params.id);
    await user.save();
    res.redirect("/shop")
})

router.get("/cart", isLoggedIn , async (req , res) =>{
    let products = await userModel.findOne({ email:req.user.email }).populate("cart");
    res.render("cart" , {product : products})
})

module.exports = router;