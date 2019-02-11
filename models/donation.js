const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const donationSchema = mongoose.Schema();
donationSchema.add({
  amount: Number, 
  message: String,
  
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
