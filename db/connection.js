const mongoose = require('mongoose');
const express = require('express');

// database connection

mongoose.connect('mongodb://localhost:27017/Fund',{

  useNewUrlParser : true,
  useUnifiedTopology : true,


})
.then(()=>{

  console.log(`Connection successful`);
})
.catch( err =>{
  console.log(err);
})

module.exports = mongoose;
