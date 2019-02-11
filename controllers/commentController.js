const express = require('express');
const router  = express.Router();

const Comment = require("../models/comment");

// USER INDEX
router.get('/', (req, res) => {
  Comment.find({}, (err, allUsers) => {
    if (err) res.json(err);
    res.json(allUsers);
  });
});

// USER SHOW
router.get('/:id', (req, res) => {
  Comment.findById(req.params.id, (err, foundUser) => {
    if (err) res.json(err);
    res.json(foundUser);
  });
});

// // ALL comment'S Comments
// router.get('/:id/comments', (req, res) => {
//   Comment.find({userId: req.params.id}, (err, foundPosts) => {
//     if (err) res.json(err);
//     res.json(foundPosts);
//   });
// });

// Post UPDATE, do we want to update?
router.put('/:id', (req, res) => {
  Comment.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedUser) => {
    if (err) res.json(err);
    res.json(updatedUser);
  });
});

// Post DESTROY
router.delete('/:id', (req, res) => {
  Comment.findByIdAndRemove(req.params.id, (err, deletedUser) => {
    if (err) res.json(err);
    // res.json(deletedUser);
    res.json({success: `User was removed.`})
  });
});







module.exports = router; 