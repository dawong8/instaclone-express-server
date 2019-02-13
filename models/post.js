const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const postSchema = mongoose.Schema();
postSchema.add({
  picture: String, 
  description: String, 
  likes: {type: Number, default: 0}, 
  // comments: [String], 
  
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  owner: String, // the username of post creator
  date_created: {
    type: Date,
    default: Date.now
  }, 

  whoLiked: [ {
    type: Schema.Types.ObjectId,
    ref: 'User'
  } ]
});


module.exports = mongoose.model('Post', postSchema);
