const express = require('express');
const multer = require('multer');
const router = express.Router();
const _ = require('../Helpers/ImageValidate');



var  message;


// middleware to check user logged in or not
function login_check(req,res,next){

  if(! req.user)
  {
    res.redirect("/login");
  }else{

    next();
  }
}






router.route('/')
  .get(login_check,(req,res)=>{

  
    res.render("layouts/takePicture");
  })

  .post(_.upload.single("avatar"),(req,res)=>{


     
     if(req.file === undefined)
     {
       message = "Please Select a Cover picture";
        res.render("layouts/takePicture",{

          message
        });
     }
    
    // res.status(200).json({

    //   Info : req.file
    // })
 
   
     res.redirect("/layouts/WriteStory");
  })


  /* This middleware is Not working properly */
  const ErrorHandler = (err,req,res,next)=>{


    if(err)
    {
      if(err instanceof multer.MulterError)
      {
         
        res.status(500).send(err.message);
  
      }else{
  
       res.status(500).send(err.message);
      }
    }
  
  }

  /*------------------------*/
  
  router.use(ErrorHandler);
  
  


module.exports = {

  router,
  
  
};