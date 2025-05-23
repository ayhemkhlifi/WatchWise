const jwt = require('jsonwebtoken')
const User = require('../Models/userModels')


const requireAuth =async (req , res , next)=>{
    const {authorization} = req.headers
    if(!authorization){
        
        return res.status(401).json({error:'JWT required'})
        
        
    }
    const token = authorization.split(' ')[1]
    try {
        const {_id} =jwt.verify(token,process.env.Secret)
        req.user= await User.findOne({_id}).select('_id')
        next()
    }catch(error){
        res.status(401).json({error:'request is not authorized'})
    }
    
}
module.exports = requireAuth