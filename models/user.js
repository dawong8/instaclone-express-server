const mongoose = require('mongoose');
const Posts = require("./post");


const userSchema = mongoose.Schema();
userSchema.add({
  username: {
  	type: String, 
  	unique: true
  },
  password: String,
  email: {
  	type:String,
  	unique: true
  },
  postPosted: [Posts.schema],
  followers: {type: Number, default: '0'},
  usersFollowing: [userSchema]
});


// Exporting the whole fruits array
// and it will be named whatever we require as
module.exports = mongoose.model('User', userSchema);
