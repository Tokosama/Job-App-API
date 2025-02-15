const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Provide a name"],
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: [true, "Please Provide an email"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,'Please provide valide email'
    ],
    unique:true,
  },
  password: {
    type: String,
    required: [true, "Please Provide a name"],
    minlength: 6,
    maxlength: 12,
  },
});


module.exports = mongoose.model('User',UserSchema)