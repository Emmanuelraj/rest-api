const mongoose = require('mongoose');

var mongooseSchema = new mongoose.Schema({

   title:{
      type:String,
      required:true
   },

   author:{
     type:String,
     required:true
    },
    body:
    {
      type:String,
      required:true
    },
   createdDate:
   {
     type:Date,
     default: Date.now
   }


})
module.exports=mongoose.model('book',mongooseSchema);
