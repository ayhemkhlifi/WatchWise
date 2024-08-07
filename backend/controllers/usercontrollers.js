const User = require("../Models/userModels")
const jwt = require("jsonwebtoken")

const createToken = (_id)=>{
    return jwt.sign({_id},process.env.Secret,{expiresIn:'1d'})
}
module.exports={ //signup {username ,email , password} => signup(req.body={usernae...})
    signup: async (req , res)=>{
        const {username, email , password} = req.body
        try{
            const user = await User.signup(username,email,password)
            const token = createToken(user._id)
            res.status(200).json(user , token)

        }catch(error){
            res.status(401).json(error)
        }
        

    },
    signin:async(req,res)=>{
        const {email , password} = req.body
        try {
            const user = await User.signin(email,password)
            const token = createToken(user._id)
            res.status(200).json({"email":email})

        }catch(error){
            res.status(401).json({"error":error.message})
        }
    }
}