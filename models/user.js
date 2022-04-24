const mongoose = require('mongoose');
const Joi = require('joi');

////////////////////////////////////////////////////////////////////////////////////////////////
const userSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 5, maxlength: 50 }, 
    password: { type: String, required: true, minlength: 5, maxlength: 1024 }, 
    email: { type: String, unique:true, required: true, minlength: 5, maxlength: 255 }, 

    avatar: { type: String, minlength: 0, maxlength: 50 },
    aboutMe: { type: String,  minlength: 5, maxlength: 1000 }, 
    role: { type: Boolean, default : false },  
    bookedTours: [],
    tours: [],
    dateAdded: { type: Date, default: Date.now },
  }); 

////////////////////////////////////////////////////////////////////////////////////////////////

 const User = mongoose.model("User", userSchema);

////////////////////////////////////////////////////////////////////////////////////////////////
function validateUser(user) {
  const schema  =Joi.object({
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(1024).required(),
  });
  return schema.validate(user);
}

////////////////////////////////////////////////////////////////////////////////////////////////

  module.exports = {
    User: User,
    validateUser: validateUser,
  } 
  
  