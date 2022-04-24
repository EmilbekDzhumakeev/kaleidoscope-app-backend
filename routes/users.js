const {User, validateUser} = require('../models/user'); 
const { Message,  BookedTour } = require('../models/bookedTour');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
 

////////////////////////////////////////////////////////// GET all Users//////////////////////////////////////////
router.get('/', async (req, res) => {
    try {
       const user = await User.find();
       return res.send(user);
    } catch (ex) {
       return res.status(500).send(`Internal Server Error: ${ex}`);
    }
 });
  ////////////////////////////////////////////////////////// GET User's BookedTours//////////////////////////////////////////
router.get('/:id/bookedTours', async (req, res) => {
   //TODO: refactor to get ALL users by videoId
   try {

      const user = await User.findById(req.params.id);
      if (!user)
         return res.status(400).send(`The User with id "${req.params.id}" does not exist.`);

         let bookedTour = await BookedTour.find({_id: user.bookedTours});

      return res.send(bookedTour);
   } catch (ex) {
      return res.status(500).send(`Internal Server Error: ${ex}`);
   }
}); 

 ////////////////////////////////////////////////////////// GET User By ID //////////////////////////////////////////
 router.get('/:id', async (req, res) => {
    try {
       const user = await User.findById(req.params.id);
       if (!user)
          return res.status(400).send(`The User with id "${req.params.id}" does not exist.`);
       return res.send(user);
    } catch (ex) {
       return res.status(500).send(`Internal Server Error: ${ex}`);
    }
 });
 
 ////////////////////////////////////////////////////////// POST new User//////////////////////////////////////////
//  router.post('/', async (req, res) => {
//     try {
 
//        let user = await User.findOne({ email: req.body.email });
//        if (user) return res.status(400).send('User already registered.');
 
//        user = new User({
//           name: req.body.name,
//           email: req.body.email,
//           password: req.body.password,
          
//        });
 
//        await user.save();
//        return res.send(user);
//     } catch (ex) {
//        return res.status(500).send(`Internal Server Error: ${ex}`);
//     }
//  });
////////////////////////////////////////////////////////// POST new User (JWT)  /////////////////////////////////////////
router.post('/', async (req, res) => {
   try {
         const { error } = validateUser(req.body);

         if (error) return res.status(400).send(error.details[0].message);

         let user = await User.findOne({ email: req.body.email });
         if (user) return res.status(400).send('User already registered.');

         const salt = await bcrypt.genSalt(10);
          user = new User({
             name: req.body.name,
             email: req.body.email,
             password: await bcrypt.hash(req.body.password, salt),
   });
          await user.save();
          return res.send({ _id: user._id, name: user.name, email: user.email });
   }      catch (ex) {
          return res.status(500).send(`Internal Server Error: ${ex}`);
   }
  });
//////////////////////////////////////////////////////////////////// PUT to add Tour///////////////////////
router.put('/:userId/:tourId/tours', async (req, res) => {

    try {
       const user = await User.findById(req.params.userId)
 
       if (!user)
          return res.status(400).send(`The user with id "${req.params.userId}" does not exist.`);
 
       user.tours.push(req.params.tourId) 
          
       await user.save();
       return res.send(user);
    } catch (ex) {
       return res.status(500).send(`Internal Server Error: ${ex}`);
    }
 }); 

 //////////////////////////////////////////////////////////////////// PUT to add BookedTour///////////////////////
router.put('/:userId/:BookedTourId/bookedTours', async (req, res) => {

   try {
      const user = await User.findById(req.params.userId)

      if (!user)
         return res.status(400).send(`The user with id "${req.params.userId}" does not exist.`);

      user.bookedTours.push(req.params.BookedTourId) 
         
      await user.save();
      return res.send(user);
   } catch (ex) {
      return res.status(500).send(`Internal Server Error: ${ex}`);
   }
}); 

////////////////////////////////////////////////////////// Validate User Login //////////////////////////////////////////
router.post('/login', async (req, res) => {
   try {
      
      let user = await User.findOne({ email: req.body.email });
      if (!user ) return res.status(400).send('User does not exist.');

      return res.send(user);
   } catch (ex) {
      return res.status(500).send(`Internal Server Error: ${ex}`);
   }
});


module.exports = router;