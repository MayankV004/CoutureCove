const userModel = require("../models/user-model");
const { hashPass } = require("../utils/encryptPass");
const { jsontoken } = require("../utils/GenerateToken");
const { comparePass } = require("../utils/decryptPass");

const registerUser = async (req, res) => {
  let { fullname, email, password } = req.body;
  try {
    let IsExistUser = await userModel.find({ email: email });
    if (IsExistUser.length > 0) {
      // checking if email is already registered
      req.flash("message", "The email is already registered");
      res.redirect("/");
    }
    const hash = await hashPass(password); // hashing the password
    let user = await userModel.create({
      fullname,
      email,
      password: hash,
    });
    const token = jsontoken(user); // generating token
    res.cookie("token", token);
    req.flash("message", "Account created successfully , you can login now");
    res.redirect("/");
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const IsExistUser = await userModel.findOne({ email: email }).select("+password");
    
    if (!IsExistUser) {
      req.flash("message", "Something went wrong");
      res.redirect("/");
    } else {
      const user = IsExistUser;
      const isMatch = comparePass(password, user.password);
      if (!isMatch) {
        // if password is not matched
        req.flash("message", "Invalid credentials");
        return res.redirect("/");
      }
      // if password is matched

      const token = jsontoken(user);
      res.cookie("token", token);
      req.flash("message", "Login Sucessfully");
      res.redirect("/shop");
    }
  } catch (
    err // if any error occurs
  ) {
    console.error("Error during login:", err);
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};

const logoutUser = (req, res) => {
  try {
    res.clearCookie("token"); // clear the cookie
    req.flash("message", "Logged out successfully");
    res.redirect("/");
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
};
