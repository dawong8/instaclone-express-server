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

  followers: {type: Number, default: '0'},
  usersFollowing: [ String ]
});


module.exports = mongoose.model('User', userSchema);
