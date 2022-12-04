const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: [true, "please enter your first name"],
    },
    lastName: {
      type: String,
      trim: true,
    },
    emailID: {
      type: String,
      trim: true,
      unique: true,
      required: "Email address is required",
      validate: {
        validator: function (r) {
          return /[A-Z0-9._%+-]*@gmail.com/.test(r);
        },
        message : (error) => `${error.value} is not a valid emailID`,
      },
      
      // validate : {
      //   validator : function validateEmail(emailID){
      //     let matchEmail = "/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,4}$/";
      //     return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,4}$/.test(emailID);
      //   },
      //   message : (error) => `${error.value} is not a valid emailID`,
      // }
    },
    password: {
      type: String,
      trim: true,
      unique: true,
      required: "Password is required",
      validate: {
        validator: function (r) {
          return r.length > 7 && /\d+/.test(r);
        },
        message: () => `Please enter valid password`,
      },
      // validate : {
      //   validator : function validatePassword(password){
      //     let matchPass = "/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,18}$/";
          // return /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,18}$/.test(password);
      }
  },{ timestamps: true }
);

function validateEmail(emailID) {
  let matchEmail = "^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,4}$";
  return matchEmail.test(emailID);
}

function validatePassword(password) {
  let matchPass = "^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,18}$";
  return matchPass.test(password);
}

module.exports = mongoose.model("User", userSchema);
