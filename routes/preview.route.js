const express = require('express');
const path = require('path');
const fs = require('fs');
const router = express.Router();


const updated_path = "/img/Picture/";



router.route('/')
  .get((req,res)=>{

    console.log(req.query);
    
   

    let FullPath = fs.readdirSync("./public/Image/Picture");
   
    FullPath = path.join(updated_path,FullPath[0]);
   
    
    setTimeout(()=>{

     
      res.render("layouts/previewPage",{

        StoryTitle : req.query.StoryTitle,
        Amount : req.query.Amount,
        Validity : req.query.Validity,
        CoverPicture :  FullPath,
        
      });
  
    },2000)
    

    
  })


module.exports = router;