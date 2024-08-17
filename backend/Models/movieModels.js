const mongoose = require('mongoose')
const Schema = mongoose.Schema

const movieschema = new Schema (
    {
        "movieid":{
            type:String,
            require:true
        },
        "title":{
            type:String, 
            required:true
        },
        "poster_path":{
            type:String, 
            required:true
        },
        "imbd_rating":{
            type:String,
            require:true,
        },
        "user_id":{
            type:String,
            require:true
        }
       
    },
    {
        timestamps:true
    }
)

module.exports = mongoose.model('Movie',movieschema)