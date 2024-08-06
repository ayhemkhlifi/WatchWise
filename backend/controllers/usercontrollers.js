const User = require("../Models/userModels")


module.exports={ //signup {username ,email , password} => signup(req.body={usernae...})
    signup: async (req , res)=>{
        const {username, email , password} = req.body
        try{
            const user = await User.signup(username,email,password)
            res.status(200).json(user)

        }catch(error){
            res.status(501).json(error)
        }
        

    },
}