const express = require('express');
const path = require('path');
const fs = require('fs');
const router = express.Router();
const {checkAuthenticated} = require('../Helpers/Information');


const updated_path = "/img/Picture/";



router.route('/')
  .get(checkAuthenticated,(req,res)=>{

    console.log(req.query);
    console.log(req.user);
    
   

    let FullPath = fs.readdirSync("./public/Image/Picture");
   
    FullPath = path.join(updated_path,FullPath[0]);
   
    
    setTimeout(()=>{

     
      res.render("layouts/previewPage",{

        StoryTitle : req.query.StoryTitle,
        Amount : req.query.Amount,
        Validity : req.query.Validity,
        CoverPicture :  FullPath,
        user : req.user,
        
      });
  
    },2000)
    

    
  })


module.exports = router;