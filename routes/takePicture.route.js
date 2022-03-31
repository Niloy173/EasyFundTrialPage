const express = require('express');

const router = express.Router();
const _ = require('../Helpers/ImageValidate');


router.route('/')
  .get((req,res)=>{

    // console.log(`Requwsted url => `+req.baseUrl);
    // console.log(`Requwsted url => `+req.originalUrl);
    // console.log(`Requwsted path => `+req.path);
    // console.log(`Requwsted method => `+req.method);
    res.render("layouts/takePicture");
  })

  .post(_.upload.single("avatar"),(req,res)=>{

    
    // res.status(200).json({

    //   Info : req.file
    // })
     res.redirect("/layouts/WriteStory");
  })

  
  express()
  .use((req,res,err,next)=>{


    if(err)
    {
      if(err instanceof multer.MulterError)
      {
         
        res.status(500).send(err.message)
      }else{

        res.status(500).send(err.message)

      }
    }
  });

module.exports = router;