const { Message, BookedTour, Traveler, validateTraveler,validateMessage  } = require('../models/traveler'); 
const {TourGuide, Tour, Comment } = require('../models/tourGuide');
const express = require('express');
const router = express.Router();
 

////////////////////////////////////////////////////////// GET all TourGuides//////////////////////////////////////////
router.get('/', async (req, res) => {
    try {
       const tourGuides = await TourGuide.find();
       return res.send(tourGuides);
    } catch (ex) {
       return res.status(500).send(`Internal Server Error: ${ex}`);
    }
 });
 
 ////////////////////////////////////////////////////////// GET TourGuide By ID //////////////////////////////////////////
 router.get('/:id', async (req, res) => {
    //TODO: refactor to get ALL users by videoId
    try {
 
       const tourGuide = await TourGuide.findById(req.params.id);
       if (!tourGuide)
          return res.status(400).send(`The TourGuide with id "${req.params.id}" does not exist.`);
       return res.send(tourGuide);
    } catch (ex) {
       return res.status(500).send(`Internal Server Error: ${ex}`);
    }
 });
 
 ////////////////////////////////////////////////////////// POST new TourGuide//////////////////////////////////////////
 router.post('/', async (req, res) => {
    try {
 
       let tourGuide = await TourGuide.findOne({ email: req.body.email });
       if (tourGuide) return res.status(400).send('TourGuide already registered.');
 
       tourGuide = new TourGuide({
          name: req.body.name,
          password: req.body.password,
          email: req.body.email,
          avatar: '',
          aboutMe: 'Tell us all about you...',
          role: req.body.role,
       });
 
       await tourGuide.save();
       return res.send(tourGuide);
    } catch (ex) {
       return res.status(500).send(`Internal Server Error: ${ex}`);
    }
 });

 ////////////////////////////////////////////////////////// POST new Tour //////////////////////////////////////////
router.post('/:id/tour', async (req, res) => {
    try {
       const { error } = (req.body);  // validateUser
       if (error)
          return res.status(400).send(error);
 
       const tourGuide = await TourGuide.findById(req.params.id)
 
       const tour = new Tour({
 
        tTitle: req.body.tTitle,
        description: req.body.description,
        route: req.body.route, 
        
       });
 
       tourGuide.tours.push(tour)
 
       await tourGuide.save();
       return res.send(tourGuide);
 
    } catch (ex) {
       return res.status(500).send(`Internal Server Error: ${ex}`);
    }
 }); 
 ////////////////////////////////////////////////////////// POST new Tour Comment //////////////////////////////////////////
router.post('/:id/tourId', async (req, res) => {
    try {
       const { error } = (req.body);  // validateUser
       if (error)
          return res.status(400).send(error);
 
       const tourGuide = await TourGuide.findById(req.params.id)
       const tours = await Tour.findById(req.params.tourId) 

       const comment = new Comment({
 
        author: req.body.author,
        feedback: req.body.feedback,
       
        
       });
 
       tourGuide.tours.comments.push(comment)
 
       await tourGuide.save();
       return res.send(tourGuide);
 
    } catch (ex) {
       return res.status(500).send(`Internal Server Error: ${ex}`);
    }
 });
///////////////////////////////////////////////////////////////////////////////////////////////////////////
 


module.exports = router;