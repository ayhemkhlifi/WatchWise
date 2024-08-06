const express = require('express') 
const mongoose= require('mongoose')
const dotenv = require('dotenv')
const movieroutes=require('./Routes/movies')
const userroutes= require('./Routes/users')
dotenv.config()
const app = express()

//middleware to analyse the on comming http request as json format
app.use(express.json())



mongoose.connect(process.env.mongodburl)
.then(()=>{
    console.log("connected to the database");
    app.listen(3000,()=>{
        console.log("app listening on port ")
    })
})

app.use('/movies',movieroutes)
app.use('/users',userroutes)

