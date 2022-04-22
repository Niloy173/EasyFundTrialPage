const express = require('express');
const multer = require('multer');
const router = express.Router();
const _ = require('../Helpers/ImageValidate');
const {checkAuthenticated} = require('../Helpers/Information');


var  message;





router.route('/')
  .get(checkAuthenticated,(req,res)=>{

   
    // console.log(req.get('accept'))
    
    //console.log(req.route);
    // console.log(req.app.get("view engine"));
    // console.log(`Requwsted url => `+req.baseUrl);
    // console.log(`Requwsted url => `+req.originalUrl);
    // console.log(`Requwsted path => `+req.path);
    // console.log(`Requwsted method => `+req.method);
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
  
  router.use(ErrorHandler);
  
  


module.exports = {

  router,
  
  
};