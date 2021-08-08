const mongoose = require('mongoose');
const Joi = require('joi');


////////////////////////////////////////////////////////////////////////////////////////////////
const messageSchema = new mongoose.Schema({
    author: { type: String, required: true, minlength: 5, maxlength: 500 },
    post: {type: String, required: true, minlength: 5, maxlength: 50},
    dateAdded: { type: Date, default: Date.now },
  }); 

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
    route: {type: String, required: true, minlength: 5, maxlength: 50}, 
    comments: [commentSchema],
    dateAdded: { type: Date, default: Date.now },
  });

 ////////////////////////////////////////////////////////////////////////////////////////////////
const bookedTourSchema = new mongoose.Schema({
  tours: [],
  messages: [messageSchema],
  dateAdded: { type: Date, default: Date.now },
});
////////////////////////////////////////////////////////////////////////////////////////////////
const travelerSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 2, maxlength: 50 }, 
    password: { type: String, required: true, minlength: 5, maxlength: 50 }, 
    email: { type: String, required: true, minlength: 5, maxlength: 50 }, 
    avatar: { type: String, minlength: 0, maxlength: 50 },
    aboutMe: { type: String,  minlength: 5, maxlength: 1000 }, 
    role: { type: String, required: true, minlength: 2, maxlength: 50 },  
    bookedTours: [bookedTourSchema],
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
    tour: [tourSchema],
    dateAdded: { type: Date, default: Date.now },
  });
////////////////////////////////////////////////////////////////////////////////////////////////

const Message = mongoose.model("Message", messageSchema); 
const Comment = mongoose.model("Comment", commentSchema);
const Tour = mongoose.model("Tour", tourSchema);
const BookedTour = mongoose.model("BookedTour", bookedTourSchema); 
const Traveler = mongoose.model("Traveler", travelerSchema); 
const TourGuide = mongoose.model("TourGuide", tourGuideSchema);
////////////////////////////////////////////////////////////////////////////////////////////////

function validateTraveler(traveler){
    const schema = Joi.object({ 
     name: Joi.string().min(2).max(50).required(), 
     password: Joi.string().min(5).max(50).required(),
     email: Joi.string().min(5).max(50).required(), 
    
     
    });
    return schema.validate(traveler);
} 
////////////////////////////////////////////////////////////////////////////////////////////////
function validateMessage(message){
  const schema = Joi.object({
      post: Joi.string().min(5).max(1000).required(),  
      author: Joi.string().min(5).max(50).required(), 
  });
  return schema.validate(message);
}
////////////////////////////////////////////////////////////////////////////////////////////////

module.exports = {
  Message: Message,
  Comment: Comment,
  Tour: Tour,
  BookedTour: BookedTour, 
  Traveler: Traveler, 
  TourGuide: TourGuide, 
  validateTraveler: validateTraveler,
  validateMessage: validateMessage 
} 

