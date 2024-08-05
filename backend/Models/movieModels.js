const mongoose = require('mongoose')
const Schema = mongoose.Schema

const movieschema = new Schema (
    {
        "title":{
            type:String , 
            required:true
        },
        "posterpath":{
            type:String , 
            required:true
        }
    },
    {
        timestamps:true
    }
)

module.exports = mongoose.model('Movie',movieschema)