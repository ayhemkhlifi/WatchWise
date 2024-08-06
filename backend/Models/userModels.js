const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const userSchema = new Schema (
    {
        "email":{
            type:String ,
            require:true,
            unique:true,
        },
        "password":{
            type:String,
            require:true,
        }
    }
)



//static methodes for this schema : 
//signup using Hashing for Protection
userSchema.statics.signup = async function  (email , password){
     const exist =await  this.findOne({"email":email})
     if(exist){
        throw Error("email already exists")
     }
     const salt  =await bcrypt.genSalt(10)
     const hash = await bcrypt.hash(password , salt)
     const user = await this.create({"email":email , "password":hash})
     return user;

}
//singin 






module.exports= mongoose.model('User',userSchema)