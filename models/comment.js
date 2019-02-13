const mongoose = require('mongoose');
//const Posts = require("./post");
const Schema = mongoose.Schema;


const commentSchema = mongoose.Schema();
commentSchema.add({
  description: String, 
  likes: {type: Number, default: 0}, 
  // comments: [String], 
  
  postId: {
    type: Schema.Types.ObjectId,
    ref: 'Post'
  },
  owner: String, // owner of the comment
  date_created: {
    type: Date,
    default: Date.now
  }, 

  children: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Comment'
    }
  ]
});

module.exports = mongoose.model('Comment', commentSchema);
