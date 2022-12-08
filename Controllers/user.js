const bcrypt = require("bcrypt");
const { sign } = require("crypto");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const signupHandler = async (req, res) => {
  try {
    const existingUser = await User.findOne({ emailID: req.body.emailID });
    if (existingUser) return res.json("User already exists");
    const newUser = new User(req.body);
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(newUser.password, salt);

    await newUser.save();
    const token = jwt.sign(
      { userID: newUser._id },
      process.env['ACCESS_TOKEN_SECRET'],
      { expiresIn: "7d" }
    );
    res.json({ token, firstName: newUser.firstName , userID : newUser._id});
  } catch (err) {
    console.error(err, "at signing up user at database");
    res.status(401).json({ error: err.message , message : Error });
  }
};
const loginHandler = async (req, res) => {
  try {
    const { emailID, password } = req.body;
    const existingUser = await User.findOne({ emailID });
    console.log(existingUser, "existingUser");
    if (existingUser._id.length <= 0) {
      throw new Error("User email id doesn't exist,please sign up");
    }
    const isValidPassword = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isValidPassword) throw new Error("Please enter correct password");
    const token = jwt.sign(
      { userID: existingUser._id },
      process.env['ACCESS_TOKEN_SECRET'],
      { expiresIn: "7d" }
    );
    res.json({token,firstName:existingUser.firstName,userID:existingUser._id , Error });
  } catch (err) {
    console.error(err, "at logging in userat database");
    res.status(401).json({ error: `${err.message} ,while logging in` });
  }
};
module.exports = {
  signupHandler,
  loginHandler,
};
