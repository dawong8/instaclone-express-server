const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const postSchema = mongoose.Schema();
postSchema.add({
  picture: String, 
  description: String, 
  likes: Number, 
  // comments: [String], 
  
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  date_created: {
    type: Date,
    default: Date.now
  }
});


module.exports = mongoose.model('Post', postSchema);
