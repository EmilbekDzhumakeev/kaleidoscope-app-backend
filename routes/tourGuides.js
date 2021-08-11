const {TourGuide } = require('../models/tourGuide'); 
const {Tour, Comment} = require('../models/tour')
const express = require('express');
const tour = require('../models/tour');
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
//////////////////////////////////////////////////////////////////// PUT to add Tour///////////////////////
router.put('/:tourGuideId/:tourId/tours', async (req, res) => {

    try {
       const tourGuide = await TourGuide.findById(req.params.tourGuideId)
 
       if (!tourGuide)
          return res.status(400).send(`The tourGuide with id "${req.params.tourGuideId}" does not exist.`);
 
       tourGuide.tours.push(req.params.tourId) 
          
       await tourGuide.save();
       return res.send(tourGuide);
    } catch (ex) {
       return res.status(500).send(`Internal Server Error: ${ex}`);
    }
 }); 
///////////////////////////////////////////////////////////////////////////////////////////////////////////
 
////////////////////////////////////////////////////////// Validate User Login //////////////////////////////////////////
router.post('/login', async (req, res) => {
   try {
      // const { error } = (req.body);  // validateUser
      // if (error)
      //    return res.status(400).send(error);

      let tourGuide = await TourGuide.findOne({ email: req.body.email });
      if (!tourGuide ) return res.status(400).send('User does not exist.');

      return res.send(tourGuide);
   } catch (ex) {
      return res.status(500).send(`Internal Server Error: ${ex}`);
   }
});


module.exports = router;