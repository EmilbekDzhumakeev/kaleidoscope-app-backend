const mongoose = require('mongoose');
const Joi = require('joi');
const {Tour, Comment} = require('./tour')

////////////////////////////////////////////////////////////////////////////////////////////////
const tourGuideSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 2, maxlength: 50 }, 
    password: { type: String, required: true, minlength: 5, maxlength: 50 }, 
    email: { type: String, required: true, minlength: 5, maxlength: 50 }, 
    avatar: { type: String, minlength: 0, maxlength: 50 },
    aboutMe: { type: String,  minlength: 5, maxlength: 1000 }, 
    role: { type: String, required: true, minlength: 2, maxlength: 50 },  
    bookedTours: [],
    tours: [],
    dateAdded: { type: Date, default: Date.now },
  }); 

////////////////////////////////////////////////////////////////////////////////////////////////

 const TourGuide = mongoose.model("TourGuide", tourGuideSchema);

////////////////////////////////////////////////////////////////////////////////////////////////


  module.exports = {
    TourGuide: TourGuide,
  } 
  
  