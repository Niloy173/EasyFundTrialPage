const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');


const router = express.Router();


// middleware function 

const NameOfCatgeory = (req,res,next)=>{

  console.log('This is study abroad category');
  next();
}


router.all("*",NameOfCatgeory);

router.route('/')
    .get((req,res)=>{

      res.render("category/study_abroad");
    })


module.exports = {

  router,
}