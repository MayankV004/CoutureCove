const express = require("express");
const router = express.Router();
const productModel = require("../models/product-model");
const isLoggedIn = require("../middleware/isLoggedIn");
const upload = require("../config/multer-config");

router.post("/create", isLoggedIn, upload.single("image"), async (req, res) => {
  try {
    const { name, price, discount, bgcolor, panelcolor, textcolor } = req.body;
    const product = await productModel.create({
      image: req.file.buffer,
      name,
      price,
      discount,
      bgcolor,
      panelcolor,
      textcolor,
    });
    req.flash("success", "Product created successfully");
    res.redirect("/owner/admin");
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
});

module.exports = router;
