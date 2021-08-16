const mongoose = require('mongoose');
const Joi = require('joi');


////////////////////////////////////////////////////////////////////////////////////////////////
const messageSchema = new mongoose.Schema({
    author: { type: String, required: true, minlength: 5, maxlength: 500 },
    post: {type: String, required: true, minlength: 5, maxlength: 500},
    dateAdded: { type: Date, default: Date.now },
  }); 

 ////////////////////////////////////////////////////////////////////////////////////////////////
const bookedTourSchema = new mongoose.Schema({
  
  tourName: { type: String, required: true, minlength: 5, maxlength: 500 },
  messages: [messageSchema],
  dateAdded: { type: Date, default: Date.now },
});

////////////////////////////////////////////////////////////////////////////////////////////////

const Message = mongoose.model("Message", messageSchema); 
const BookedTour = mongoose.model("BookedTour", bookedTourSchema); 

////////////////////////////////////////////////////////////////////////////////////////////////

module.exports = {
  Message: Message,
  BookedTour: BookedTour, 
  
} 

