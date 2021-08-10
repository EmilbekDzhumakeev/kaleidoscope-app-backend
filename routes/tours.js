//const {TourGuide } = require('../models/tourGuide'); 
const {Tour, Comment} = require('../models/tour')
const express = require('express');
const router = express.Router();
 

////////////////////////////////////////////////////////// GET all Tours//////////////////////////////////////////
router.get('/', async (req, res) => {
    try {
       const tours = await Tour.find();
       return res.send(tours);
    } catch (ex) {
       return res.status(500).send(`Internal Server Error: ${ex}`);
    }
 });
 
 ////////////////////////////////////////////////////////// GET Tour By ID //////////////////////////////////////////
 router.get('/:id', async (req, res) => {
    //TODO: refactor to get ALL users by videoId
    try {
 
       const tour = await Tour.findById(req.params.id);
       if (!tour)
          return res.status(400).send(`The Tour with id "${req.params.id}" does not exist.`);
       return res.send(tour);
    } catch (ex) {
       return res.status(500).send(`Internal Server Error: ${ex}`);
    }
 });
 

 ////////////////////////////////////////////////////////// POST new Tour //////////////////////////////////////////
router.post('/', async (req, res) => {
    try {
        let tour = await Tour.findOne({ tTitle: req.body.tTitle });
        if (tour) return res.status(400).send('Tour title already exists.');
 
      tour = new Tour({
 
        tTitle: req.body.tTitle,
        description: req.body.description,
        route: req.body.route, 
        
       });
 
      
       await tour.save();
       return res.send(tour);
 
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
//        data._id == req.params.tourId ? console.log('tour does not exist'): 
       
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