const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewschema = new Schema(
  {
    "movieId": {
      type: String,
      required: true
    },
    "user_id":{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User schema
      required: true
     },
     
   
    "review": {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Review', reviewschema);
