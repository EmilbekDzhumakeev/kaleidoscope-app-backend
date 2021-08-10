const { Message,  BookedTour, Traveler,  validateTraveler,validateMessage  } = require('../models/traveler');
//const {TourGuide, Tour, Comment} = require('../models/tourGuide');
const express = require('express');
const router = express.Router();


// All endpoints and route handlers go here
////////////////////////////////////////////////////////// GET all users//////////////////////////////////////////
router.get('/', async (req, res) => {
   try {
      const travelers = await Traveler.find();
      return res.send(travelers);
   } catch (ex) {
      return res.status(500).send(`Internal Server Error: ${ex}`);
   }
});

////////////////////////////////////////////////////////// GET User By ID //////////////////////////////////////////
router.get('/:id', async (req, res) => {
   //TODO: refactor to get ALL users by videoId
   try {

      const traveler = await Traveler.findById(req.params.id);
      if (!traveler)
         return res.status(400).send(`The Traveler with id "${req.params.id}" does not exist.`);
      return res.send(traveler);
   } catch (ex) {
      return res.status(500).send(`Internal Server Error: ${ex}`);
   }
});
////////////////////////////////////////////////////////// POST new Traveler//////////////////////////////////////////
router.post('/', async (req, res) => {
   try {

      let traveler = await Traveler.findOne({ email: req.body.email });
      if (traveler) return res.status(400).send('Traveler already registered.');

      traveler = new Traveler({
         name: req.body.name,
         password: req.body.password,
         email: req.body.email,
         avatar: '',
         aboutMe: 'Tell us all about you...',
         role: req.body.role,
      });

      await traveler.save();
      return res.send(traveler);
   } catch (ex) {
      return res.status(500).send(`Internal Server Error: ${ex}`);
   }
});

////////////////////////////////////////////////////////// POST new TourGuide//////////////////////////////////////////
// router.post('/', async (req, res) => {
//    try {

//       let tourGuide = await TourGuide.findOne({ email: req.body.email });
//       if (tourGuide) return res.status(400).send('TourGuide already registered.');

//       tourGuide = new TourGuide({
//          name: req.body.name,
//          password: req.body.password,
//          email: req.body.email,
//          avatar: '',
//          aboutMe: 'Tell us all about you...',
//          role: req.body.role,
//       });

//       await tourGuide.save();
//       return res.send(tourGuide);
//    } catch (ex) {
//       return res.status(500).send(`Internal Server Error: ${ex}`);
//    }
// });
/*

////////////////////////////////////////////////////////// Validate User Login //////////////////////////////////////////
router.post('/login', async (req, res) => {
   try {
      // const { error } = (req.body);  // validateUser
      // if (error)
      //    return res.status(400).send(error);

      let user = await User.findOne({ email: req.body.email });
      if (!user) return res.status(400).send('User does not exist.');

      return res.send(user);
   } catch (ex) {
      return res.status(500).send(`Internal Server Error: ${ex}`);
   }
});

//////////////////////////////////////////////////////////////////// PUT for user Profile update////////////////////////
router.put('/:id', async (req, res) => {
   try {
      const { error } = (req.body);                      // validate
      if (error) return res.status(400).send(error);
      const user = await User.findByIdAndUpdate(
         req.params.id,
         {
            name: req.body.name,
            password: req.body.password,
            email: req.body.email,
            avatar: req.body.avatar,
            aboutMe: req.body.aboutMe,


         },
         { new: true }
      );
      if (!user)
         return res.status(400).send(`The user with id "${req.params.id}" does not exist.`);
      await user.save();
      return res.send(user);
   } catch (ex) {
      return res.status(500).send(`Internal Server Error: ${ex}`);
   }
});
////////////////////////////////////////////////////////// POST new Post //////////////////////////////////////////
router.post('/:id/post', async (req, res) => {
   try {
      const { error } = (req.body);  // validateUser
      if (error)
         return res.status(400).send(error);

      const user = await User.findById(req.params.id)

      const post = new Post({

         post: req.body.post,
         author: req.body.author,
         likes: req.body.likes,

      });

      user.posts.push(post)

      await user.save();
      return res.send(user);

   } catch (ex) {
      return res.status(500).send(`Internal Server Error: ${ex}`);
   }
});
////////////////////////////////////////////////////////// POST new friend Request IN //////////////////////////////////////////
router.post('/:id/friendRequestIn', async (req, res) => {
   try {
      const { error } = (req.body);  // validateUser
      if (error)
         return res.status(400).send(error);

      const user = await User.findById(req.params.id)

      const friendRequestIn = new FriendRequestIn({

         receiver: req.body.receiver,
         status: req.body.status,


      });

      user.friendRequestIn.push(friendRequestIn)

      await user.save();
      return res.send(user);

   } catch (ex) {
      return res.status(500).send(`Internal Server Error: ${ex}`);
   }
});
////////////////////////////////////////////////////////// POST new friend Request OUT //////////////////////////////////////////
router.post('/:id/friendRequestOut', async (req, res) => {
   try {
      const { error } = (req.body);  // validateUser
      if (error)
         return res.status(400).send(error);

      const user = await User.findById(req.params.id)

      const friendRequestOut = new FriendRequestOut({

         sender: req.body.sender,
         status: req.body.status,


      });

      user.friendRequestOut.push(friendRequestOut)

      await user.save();
      return res.send(user);

   } catch (ex) {
      return res.status(500).send(`Internal Server Error: ${ex}`);
   }
});
////////////////////////////////////////////////////////// GET all Posts for User//////////////////////////////////////////
router.get('/:id/posts', async (req, res) => {
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
////////////////////////////////////////////////////////// GET all Friends for User//////////////////////////////////////////
router.get('/:id/friends', async (req, res) => {
   //TODO: refactor to get ALL users by videoId
   try {
     
      const user = await User.findById(req.params.id); 
      if (!user)
         return res.status(400).send(`The user with id "${req.params.id}" does not exist.`); 
         const UserNew = user.friends.filter((data) =>
         data.bff !== user._id ? userNew = user.posts : console.log('friend does not exist')
      );

//await user.save();
      return res.send(UserNew);  
      //return res.send(user.friends); 
      
   } catch (ex) {
      return res.status(500).send(`Internal Server Error: ${ex}`);
   }
});
//////////////////////////////////////////////////////////////////// PUT to add a friend (need work)///////////////////////
/*
router.post('/:id/friends', async (req, res) => {
   try {
      const { error } = (req.body);                      // validate
      if (error) return res.status(400).send(error);
      const user = await User.findById(
         req.params.id,
         {
            friends: req.body.friends,

         },
         { new: true }
      );
      if (!user)
         return res.status(400).send(`The user with id "${req.params.id}" does not exist.`);
      await user.save();
      return res.send(user.friends);
   } catch (ex) {
      return res.status(500).send(`Internal Server Error: ${ex}`);
   }
}); 
////////////////////////////////////////////////////////// POST to add a friend //////////////////////////////////////////
router.post('/:id/friends', async (req, res) => {
   try {
      const { error } = (req.body);  // validateUser
      if (error)
         return res.status(400).send(error);

      const user = await User.findById(req.params.id)

      const friend = new Friend({

         bff: req.body.bff,
       
      });

      user.friends.push(friend)

      await user.save();
      return res.send(user);

   } catch (ex) {
      return res.status(500).send(`Internal Server Error: ${ex}`);
   }
});
//////////////////////////////////////////////////////////////////// PUT  Likes (works)////////////////////////////////////////
router.put('/:userId/:postId/likes', async (req, res) => {


   try {
      const user = await User.findById(req.params.userId)

      if (!user)
         return res.status(400).send(`The post with id "${req.params.userId}" does not exist.`);

      //ternary
      user.posts.filter((data) =>
         data._id == req.params.postId ? data.likes++ : console.log('post does not exist')
      );

      await user.save();
      return res.send(user);
   } catch (ex) {
      return res.status(500).send(`Internal Server Error: ${ex}`);
   }
});
//////////////////////////////////////////////////////////////////// DELETE Post (working)///////////////////////////////////////
router.put('/:userId/:postId', async (req, res) => {
   try {

      const user = await User.findById(req.params.userId)

      if (!user)
         return res.status(400).send(`The post with id "${req.params.postId}" does not exist.`);

      //const post = await Post.findByIdAndRemove(req.params.id);
      const updatedUser = user.posts.filter((data) => data._id != req.params.postId)
      user.posts = updatedUser;
      await user.save();
      return res.send(user);
   } catch (ex) {
      return res.status(500).send(`Internal Server Error: ${ex}`);
   }
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////
 
*/

module.exports = router;