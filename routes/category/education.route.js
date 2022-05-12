const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const {Project} = require("../../db/usefulInfo")


const router = express.Router();


// middleware function 

// const NameOfCatgeory = (req,res,next)=>{

//   console.log('This is business category');
//   next();
// }


// router.all("*",NameOfCatgeory);

router.route('/')
    .get(async (req,res)=>{

       try {

        const data = await  Project.ByCategoryName("Education");
        res.status(200).render("category/education",{

          data,
        })
         
       } catch (error) {
         
          res.status(500).json({
            error : error.message
          })
       }
    })


module.exports = {

  router,
}