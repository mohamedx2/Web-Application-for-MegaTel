const express = require('express');
const app = express();
//cors usage
const cors = require('cors')
app.use(cors())
///////////////////////
/*const compression = require('compression');
app.use(compression)*/
//use .env file
require('dotenv').config()

///////////////////////////
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


//connect to the server
const mongoose = require('mongoose');
mongoose.connect(process.env.DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Check if MongoDB connection is successful
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});


//use routeru_iy
const router = require('./routers/router');
app.use(router)
//export of the app
module.exports =app;