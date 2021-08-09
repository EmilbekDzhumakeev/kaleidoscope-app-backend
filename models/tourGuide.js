const mongoose = require('mongoose');
const Joi = require('joi');
const { Message,  BookedTour, Traveler } = require('./traveler');
 

////////////////////////////////////////////////////////////////////////////////////////////////
const commentSchema = new mongoose.Schema({
    author: { type: String, required: true, minlength: 5, maxlength: 500 },
    feedback: {type: String, required: true, minlength: 5, maxlength: 50},
    likes: { type: Number, required: true, default: 0 },
    dislikes: { type: Number, required: true, default: 0 },
    dateAdded: { type: Date, default: Date.now },
  });

////////////////////////////////////////////////////////////////////////////////////////////////
const tourSchema = new mongoose.Schema({
    tTitle: { type: String, required: true, minlength: 5, maxlength: 1000 },
    description: { type: Number, required: true, default: 0 },
    route: {type: String, required: true, minlength: 5, maxlength: 1000},
    comments: [commentSchema],
    dateAdded: { type: Date, default: Date.now },
  });

////////////////////////////////////////////////////////////////////////////////////////////////
const tourGuideSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 2, maxlength: 50 }, 
    password: { type: String, required: true, minlength: 5, maxlength: 50 }, 
    email: { type: String, required: true, minlength: 5, maxlength: 50 }, 
    avatar: { type: String, minlength: 0, maxlength: 50 },
    aboutMe: { type: String,  minlength: 5, maxlength: 1000 }, 
    role: { type: String, required: true, minlength: 2, maxlength: 50 },  
    bookedTours: [],
    tours: [tourSchema],
    dateAdded: { type: Date, default: Date.now },
  }); 

////////////////////////////////////////////////////////////////////////////////////////////////

 const Comment = mongoose.model("Comment", commentSchema);
 const Tour = mongoose.model("Tour", tourSchema);
 const TourGuide = mongoose.model("TourGuide", tourGuideSchema);

////////////////////////////////////////////////////////////////////////////////////////////////


  module.exports = {
   
    Comment: Comment,
    Tour: Tour,
    TourGuide: TourGuide,
    
  } 
  
  