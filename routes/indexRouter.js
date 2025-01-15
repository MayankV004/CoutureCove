const express = require('express');
const router = express.Router();
const productModel = require("../models/product-model");
const isLoggedIn = require("../middleware/isLoggedIn");
router.get("/", (req, res) => {
    let message = req.flash("message");
    let error = req.flash("error");
    res.render("index" , {message , error});
});

router.get("/shop" , isLoggedIn , async (req, res) =>{
    let products = await productModel.find();
    res.render('shop', {products});
    
})

router.get("/logout" , isLoggedIn , (req , res) =>{
    res.render("shop")
})
module.exports = router;