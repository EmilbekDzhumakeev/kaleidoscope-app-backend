const {TourGuide } = require('../models/tourGuide'); 
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

///////////////////////////////////////////////////////////////////////////////////////////////////////////
 


module.exports = router;