const mongoose = require('mongoose');
const Joi = require('joi');

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
    description: { type: String, required: true, minlength: 5, maxlength: 1000},
    route: {type: String, required: true, minlength: 5, maxlength: 1000},
    comments: [commentSchema],
    dateAdded: { type: Date, default: Date.now },
  });


////////////////////////////////////////////////////////////////////////////////////////////////

 const Comment = mongoose.model("Comment", commentSchema);
 const Tour = mongoose.model("Tour", tourSchema);
 
////////////////////////////////////////////////////////////////////////////////////////////////


  module.exports = {
   
    Comment: Comment,
    Tour: Tour,
   
    
  } 
  