const express = require('express');
const router  = express.Router();
const path = require("path");

const Comment = require("../models/comment");
const Post = require("../models/post");

const multer = require('multer');
// multer 

const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); 
  }
});


const upload = multer({
  storage: storage, 
  limits: {fileSize: 1000000}, // 1 MB
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
  }
}).single('myImage'); // name: 'picture' in form 


function checkFileType(file, cb) { // checks file type, 
  //allowed extensions
  const filetypes = /jpeg|jpg|png|gif/;

  //check ext 

  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  // check mime type 
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {

    return cb(null, true); 

  } else {
    cb('Error: Images only!');
  }
}

router.post('/', (req, res) => {

  upload(req, res,  async (err) => {
    if (err) {
      res.json(err);

    } else {
      if (req.file == undefined) { // typeof req.file === 'undefined', check if there is actually an image uploaded 
        res.json(err);
      } else {

        const createdPost = await Post.create({ picture: `uploads/${req.file.filename}`, description: req.body.description, owner: req.session.username});

        createdPost.userId = req.session.userId;

        createdPost.save((err, savedPost) => {
          res.json({
            msg: 'file uploaded', 
            file: `uploads/${req.file.filename}`, 
            newPost: savedPost,  // shouldnt this be savedPost?

          });


        });
        
      }
    }
  }); 
}); 



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
router.delete('/:id', async (req, res) => {
  const deleted = await Comment.deleteMany({ postId: req.params.id });
  console.log('deleted comments (this should be array?)', deleted);
  Post.findByIdAndRemove(req.params.id, (err, deletedUser) => {
    if (err) res.json(err);
    // res.json(deletedUser);
    res.json({success: `User was removed.`})
  });
});







module.exports = router; 