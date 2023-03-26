const express = require('express');
const app = express();
//cors usage
const cors = require('cors')
app.use(cors())
///////////////////////


//use .env file
require('dotenv').config()

///////////////////////////
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


//connect to the server
const mongoose = require('mongoose');
mongoose.set('strictQuery', false)
mongoose.connect(process.env.DB)
mongoose.connection.on("connected",()=>{
    console.log("connected")
})
mongoose.connection.on("error",(err)=>{
    console.error("error",err)
})

//use router
  const router = require('./routers/router');
  app.use(router)
//export of the app
  module.exports =app;