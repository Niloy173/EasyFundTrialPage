const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');


const router = express.Router();


// middleware function 

const NameOfCatgeory = (req,res,next)=>{

  console.log('This is business category');
  next();
}


router.all("*",NameOfCatgeory);

router.route('/')
    .get((req,res)=>{

      res.render("category/business");
    })


module.exports = {

  router,
}