const mongoose = require('mongoose');
const Schema = mongoose.Schema;


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

  // people who are following you
  followers: {type: Number, default: '0'},

  // people that you are following
  usersFollowing: [String]
});


module.exports = mongoose.model('User', userSchema);
