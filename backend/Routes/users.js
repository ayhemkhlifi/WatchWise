const express = require('express')
const router = express.Router()
const Usercontroller = require('../controllers/usercontrollers')




//sign-in route 
router.post('/signin',)



//sign-up route 
router.post('/signup',Usercontroller.signup)


module.exports=router