const express = require('express');
const router  = express.Router();

const Comment = require("../models/comment");


// CREATE NEW COMMENT
router.post('/', async (req, res) => {
  console.log('req,session,userbae', req.session.username);
  try {
    const createdComment = await Comment.create({description: req.body.description, owner: req.session.username});


    createdComment.postId = req.body.postId;

    createdComment.save((err, savedPost) => {
      res.json(savedPost);


    });
        
  } catch (err) {
    return err; 
  }

})

// GET ALL COMMENTS IN DATABASE 
router.get('/', (req, res) => {
  Comment.find({}, (err, allComments) => {
    if (err) res.json(err);
    res.json(allComments);
  });
});


// GET ALL COMMENTS THAT BELONG TO A SPECIFIC comment 
router.get('/post/:id', async (req, res) => {
  try {
    const foundComment = await Comment.find({ postId: req.params.id })
      .populate('children')


    res.json(foundComment);

  } catch (err) {
    return err; 
  }


});

// LOOK AT THAT PARTICULAR comment
router.get('/:id', async (req, res) => {

  try {
    const foundComment = await Comment.findById(req.params.id).populate('children');
    res.json(foundComment);
  } catch (err) {
    return err; 
  }


});

// // ALL comment'S Comments
// router.get('/:id/comments', (req, res) => {
//   Comment.find({userId: req.params.id}, (err, foundPosts) => {
//     if (err) res.json(err);
//     res.json(foundPosts);
//   });
// });

// comment UPDATE, do we want to update?
router.put('/:id', (req, res) => {
  Comment.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedUser) => {
    if (err) res.json(err);
    res.json(updatedUser);
  });
});

// comment DESTROY
router.delete('/:id', (req, res) => {
  Comment.findByIdAndRemove(req.params.id, (err, deletedComment) => {
    if (err) res.json(err);
    // res.json(deletedUser);
    res.json({success: `User was removed.`})
  });
});

// // delete all comments belonging to this post
// router.delete('/mass/:id', (req, res) => {
//   Comment.deleteMany({ postId: req.params.id }, (err, deletedComments) => {
//     if (err) res.json(err);
//     res.json({success: 'All comments for this post was removed!'})
//   });
// });





module.exports = router; 