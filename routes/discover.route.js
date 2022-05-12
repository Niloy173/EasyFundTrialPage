const express = require('express');
const cookieParser = require('cookie-parser');
const router = express.Router();
const {Project} = require('../db/usefulInfo')


router.use(express.json());
router.use(cookieParser());

router.route('/')
  .get((req,res)=>{

    //console.log(req.app.get("view engine"));
    //console.log(`Requwsted url => `+req.baseUrl);

    new Project().ShowProject((err,data)=>{

      if(err){
        res.status(500).json({
          error : "There was an error in your request"
        });
        
      }else{

          res.render("discover",{
            data
          });
        
      }
    });
   

  })



module.exports = router;