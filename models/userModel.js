const mongoose = require("mongoose");
const validator = require('validator')

// schema with name, email, photo, password, passwordConfirm

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please tell us your name"],
  },
  
  email : {
      type : String,
      required : [true, 'Please provide your email'],
      unique : true,
      lowercase : true,
validate : [validator.isEmail, 'Please provide a valid Email']
  },
  photo : {
      type : String,
  },
  password : {
      type : String,
      required : [true,'Please provide a password'],
      minlength : 8,
  },
  passwordConfirm : {
      type : String,
      required : [true,'Please confirm password'],
  }
});


const User = mongoose.model('User', userSchema)
module.exports = User