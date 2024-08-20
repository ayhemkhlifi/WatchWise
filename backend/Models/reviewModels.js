const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewschema = new Schema(
  {
    "movieId": {
      type: String,
      required: true
    },
    "user_id":{
            type:String,
            require:true
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
