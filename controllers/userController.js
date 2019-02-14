const express = require('express');
const router  = express.Router();

const User = require("../models/user");
const Post = require("../models/post");

// USER INDEX
router.get('/', (req, res) => {
  User.find({}, (err, allUsers) => {
    if (err) res.json(err);
    res.json(allUsers);
  });
});

// USER SHOW
router.get('/:id', (req, res) => {
  User.findById(req.params.id, (err, foundUser) => {
    if (err) res.json(err);
    res.json(foundUser);
  });
});

// ALL USER'S POSTS
router.get('/:id/posts', (req, res) => {
  Post.find({userId: req.params.id}, (err, foundPosts) => {
    if (err) res.json(err);
    res.json(foundPosts);
  });
});

// USER UPDATE
router.put('/:id', (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedUser) => {
    if (err) res.json(err);
    res.json(updatedUser);
  });
});

// USER DESTROY
router.delete('/:id', (req, res) => {
  User.findByIdAndRemove(req.params.id, (err, deletedUser) => {
    console.log("Deleted user: ", deletedUser);
    if (err) res.json(err);
    // res.json(deletedUser);
    res.json({success: 'User was removed'})
  });
});







module.exports = router; 