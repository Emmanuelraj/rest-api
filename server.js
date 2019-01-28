//express
const express = require('express');
//mongoose
const mongoose = require('mongoose');
//book
const book = require('./models/book');
//restRoutes
const restRoutes = require('./routes/restRoutes');
//bodyParser
const bodyParser = require('body-parser');

const app = express();

//ejs
app.set('view engine','ejs');




//mongoose url
mongoose.connect('mongodb://testBooks:testBooks1@ds113845.mlab.com:13845/book_rest_api');


//Middleware for the bodyParser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());



//middlwar


//mongoose connection
var db = mongoose.connection;



//db err
db.on('err',function (err)
{
  console.log('err on db'+err);
})


//db connect
db.once('connect',function ()
{
    console.log('open db');
})


restRoutes(app);

//listen server port portno
app.listen('3000');
