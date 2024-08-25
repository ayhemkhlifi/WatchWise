const express = require('express') 
const mongoose= require('mongoose')
const dotenv = require('dotenv')
const movieroutes=require('./Routes/movies')
const userroutes= require('./Routes/users')
const reviewRoutes = require('./Routes/reviews')
const cors = require('cors')

dotenv.config()
const app = express()

const port = process.env.PORT || 4000

//middleware to analyse the on comming http request as json format
app.use(express.json())
app.use(cors())


mongoose.connect(process.env.mongodburl)
.then(()=>{
    console.log("connected to the database");
    app.listen(process.env.PORT,()=>{
        console.log("app listening on port ")
    })
})
app.use('/movies',movieroutes)
app.use('/users',userroutes)
app.use('/reviews', reviewRoutes);


module.exports = app ;