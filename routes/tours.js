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
 ////////////////////////////////////////////////////////// POST new comment //////////////////////////////////////////
router.post('/:id/comment', async (req, res) => {
    try {
       const { error } = (req.body);  // validateUser
       if (error)
          return res.status(400).send(error);
 
       const tour = await Tour.findById(req.params.id)
 
       const comment = new Comment({
 
          author: req.body.author,
          feedback: req.body.feedback,
 
       });
 
       tour.comments.push(comment)
 
       await tour.save();
       return res.send(tour);
 
    } catch (ex) {
       return res.status(500).send(`Internal Server Error: ${ex}`);
    }
 }); 
 ////////////////////////////////////////////////////////// GET all Commets for a Tour//////////////////////////////////////////
router.get('/:id/commnets', async (req, res) => {
    //TODO: refactor to get ALL users by videoId
    try {
 
       const user = await User.findById(req.params.id);
       if (!user)
          return res.status(400).send(`The user with id "${req.params.id}" does not exist.`);
       return res.send(user.posts);
    } catch (ex) {
       return res.status(500).send(`Internal Server Error: ${ex}`);
    }
 }); 
 //////////////////////////////////////////////////////////////////// PUT  Likes to a Comment////////////////////////////////////////
router.put('/:tourId/:commentId/likes', async (req, res) => {


    try {
       const tour = await Tour.findById(req.params.tourId)
 
       if (!tour)
          return res.status(400).send(`The tour with id "${req.params.tourId}" does not exist.`);
 
       //ternary
       tour.comments.filter((data) =>
          data._id == req.params.commentId ? data.likes++ : console.log('comment does not exist')
       );
 
       await tour.save();
       return res.send(tour);
    } catch (ex) {
       return res.status(500).send(`Internal Server Error: ${ex}`);
    }
 }); 
 //////////////////////////////////////////////////////////////////// PUT  DisLikes to a Comment////////////////////////////////////////
router.put('/:tourId/:commentId/dislikes', async (req, res) => {


    try {
       const tour = await Tour.findById(req.params.tourId)
 
       if (!tour)
          return res.status(400).send(`The tour with id "${req.params.tourId}" does not exist.`);
 
       //ternary
       tour.comments.filter((data) =>
          data._id == req.params.commentId ? data.dislikes++ : console.log('comment does not exist')
       );
 
       await tour.save();
       return res.send(tour);
    } catch (ex) {
       return res.status(500).send(`Internal Server Error: ${ex}`);
    }
 });

///////////////////////////////////////////////////////////////////////////////////////////////////////////
 


module.exports = router;