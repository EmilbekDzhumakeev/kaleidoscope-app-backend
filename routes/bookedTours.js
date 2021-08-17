const { Message,  BookedTour } = require('../models/bookedTour');
const {Tour} = require('../models/tour')
const express = require('express');
const router = express.Router();
 

////////////////////////////////////////////////////////// GET all BookedTours//////////////////////////////////////////
router.get('/', async (req, res) => {
    try {
       const bookedTours = await BookedTour.find();
       return res.send(bookedTours);
    } catch (ex) {
       return res.status(500).send(`Internal Server Error: ${ex}`);
    }
 });
 
 ////////////////////////////////////////////////////////// GET BookedTour By ID //////////////////////////////////////////
 router.get('/:id', async (req, res) => {
    //TODO: refactor to get ALL users by videoId
    try {
 
       const bookedTour = await BookedTour.findById(req.params.id);
       if (!bookedTour)
          return res.status(400).send(`The Tour with id "${req.params.id}" does not exist.`);
       return res.send(bookedTour);
    } catch (ex) {
       return res.status(500).send(`Internal Server Error: ${ex}`);
    }
 });
 
 ////////////////////////////////////////////////////////// POST new BookedTour //////////////////////////////////////////
router.post('/:tourId', async (req, res) => {
    try {
       // first, use the :tourId param to make a query on your Tour collection for the tour you want to book
       // then, check to see if that tour has already been booked (DONE, line 36)
       // Finally, use the tour.tTitle property to create a bookedTour and assign the name property to the tour name
       const tour = await Tour.findById(req.params.tourId); 
       if (!tour)
       return res.status(400).send(`The Tour with id "${req.params.id}" does not exist.`);
    

        let bookedTour = await BookedTour.findOne({tourName: tour.tTitle });
        if (bookedTour) return res.status(400).send('BookedTour title already exists.');
 
      bookedTour = new BookedTour({
 
         tourName: tour.tTitle,
       
        
       });
 
      
       await bookedTour.save();
       return res.send(bookedTour);
 
    } catch (ex) {
       return res.status(500).send(`Internal Server Error: ${ex}`);
    }
 }); 
 ////////////////////////////////////////////////////////// POST new Message in BookedTour //////////////////////////////////////////
router.post('/:bookedTourId/messages', async (req, res) => {
    try {
       const { error } = (req.body);  // validateUser
       if (error)
          return res.status(400).send(error);
 
       const bookedTour = await BookedTour.findById(req.params.bookedTourId)
 
       const message = new Message({
 
          author: req.body.author,
          post: req.body.post,
 
       });
 
       bookedTour.messages.push(message)
 
       await bookedTour.save();
       return res.send(bookedTour);
 
    } catch (ex) {
       return res.status(500).send(`Internal Server Error: ${ex}`);
    }
 }); 
 ////////////////////////////////////////////////////////// GET all Messages for a BookedTour//////////////////////////////////////////
router.get('/:id/messages', async (req, res) => {
    //TODO: refactor to get ALL users by videoId
    try {
 
       const bookedTour = await BookedTour.findById(req.params.id);
       if (!bookedTour)
          return res.status(400).send(`The bookedTour with id "${req.params.id}" does not exist.`);
       return res.send(bookedTour.messages);
    } catch (ex) {
       return res.status(500).send(`Internal Server Error: ${ex}`);
    }
 }); 

 ////////////////////////////////////////////////////////// POST new Tour Comment (needs work)/////////////////////////////////////////
// router.post('/:id/:tourId/comment', async (req, res) => {
//     try {
//         const tourGuide = await TourGuide.findById(req.params.id)
//         if (!tourGuide) 
//         return res.status(400).send(`The TourGuide with id "${req.params.id}" does not exist.`);
 
//        tourGuide.tours.filter((data) => 
//        data._id == req.params.tourId ? console.log('bookedTour does not exist'): 
       
//          comment = new Comment({

//         author: req.body.author,
//         feedback: req.body.feedback, 
        
//        }) 
       
//        );
//        console.log(comment);
       
//        tourGuide.tours.comments.push(comment) 
//        await tourGuide.save();
//        return res.send(tourGuide);
 
//     } catch (ex) {
//        return res.status(500).send(`Internal Server Error: ${ex}`);
//     }
//  });
///////////////////////////////////////////////////////////////////////////////////////////////////////////
 


module.exports = router;