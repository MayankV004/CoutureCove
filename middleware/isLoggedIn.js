//For Creating Protected Routes

const jwt = require('jsonwebtoken');
const userModel = require('../models/user-model');
const { model } = require('mongoose');
require('dotenv').config();

const isLoggedIn = async (req ,res , next) =>{
    if(!req.cookies.token)
    {
        req.flash("error" , "You need to login first");
        return res.redirect("/");
    }

    try
    {
        let check = jwt.verify(req.cookies.token , process.env.JWT_SECRET);
        let user = await userModel.findOne({_id : check.id});
        req.user = user;
        next();

    }
    catch(err)
    {
        res.status(400);
        req.flash(err.message);
        res.redirect("/");
    }
}

module.exports = isLoggedIn;