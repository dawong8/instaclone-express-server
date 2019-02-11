const mongoose = require('mongoose');
//const Posts = require("./post");
const Schema = mongoose.Schema;


const commentSchema = mongoose.Schema();
commentSchema.add({
  description: String, 
  likes: Number, 
  // comments: [String], 
  
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'Post'
  },
  date_created: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Comment', commentSchema);
