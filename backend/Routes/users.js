const express = require('express')
const router = express.Router()
const Usercontroller = require('../controllers/usercontrollers')




//sign-in route 
router.post('signin',Usercontroller.signup)



//sign-up route 
router.post('signup',)


module.exports=router