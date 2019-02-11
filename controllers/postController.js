const express = require('express');
const router  = express.Router();

const Comment = require("../models/comment");
const Post = require("../models/post");

// post INDEX
router.get('/', (req, res) => {
  Post.find({}, (err, allUsers) => {
    if (err) res.json(err);
    res.json(allUsers);
  });
});

// post SHOW
router.get('/:id', (req, res) => {
  Post.findById(req.params.id, (err, foundUser) => {
    if (err) res.json(err);
    res.json(foundUser);
  });
});

// ALL Post'S Comments
router.get('/:id/comments', (req, res) => {
  Comment.find({userId: req.params.id}, (err, foundPosts) => {
    if (err) res.json(err);
    res.json(foundPosts);
  });
});

// Post UPDATE, do we want to update?
router.put('/:id', (req, res) => {
  Post.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedUser) => {
    if (err) res.json(err);
    res.json(updatedUser);
  });
});

// Post DESTROY
router.delete('/:id', (req, res) => {
  Post.findByIdAndRemove(req.params.id, (err, deletedUser) => {
    if (err) res.json(err);
    // res.json(deletedUser);
    res.json({success: `User was removed.`})
  });
});







module.exports = router; 