const User = require("../Models/userModels")


module.exports={
    signup: async (req , res)=>{
        const {email , password} = req.body
        try{
            const user = await User.signup(email,password)
            res.status(200).json(user)

        }catch(error){
            res.status(501).json(error)
        }
        

    },
}