const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const body = require('body-parser');
const router = express.Router();


router.use(express.json())


// middleware to check user logged in or not
function login_check(req,res,next){

  if(! req.user)
  {
    res.redirect("/");
  }else{

    next();
  }
}



// requiring the schema
const {Project} = require("../db/usefulInfo")


const ProjectDocument = {};





router.get("/",login_check,(req,res,next)=>{

   
   


      // ProjectDocument.CoverPicture = FullPath;
     
      res.render("layouts/previewPage",{

       

         
        username : req.user.username,
        picturelink : req.user.picturelink,
        picture : req.user.picture,
        StoryTitle : req.query.StoryTitle,
        MainStory: req.query.Main_story,
        Amount : req.query.Amount,
        Validity : req.query.Validity,
        CoverPicture :  req.query.FullPath,


   

       
        
      });
  
    
    

    
  })

  router.post("/",(req,res)=>{

    /* user info---------------------*/
    ProjectDocument.OwnerId = req.user._id; // check the userid from user table from database 
  //   ProjectDocument.Username = req.user.username;
  //  ProjectDocument.Userpicture = req.user.picturelink;

   /* ---- project info --------------------*/
    ProjectDocument.Amount = req.query.Amount;
    ProjectDocument.Validity = req.query.Validity;
    ProjectDocument.StoryTitle = req.query.StoryTitle;
    ProjectDocument.MainStory = req.query.Main_story;
    ProjectDocument.Category = req.query.Category;
    ProjectDocument.CreationDate = new Date().toLocaleDateString(),
    ProjectDocument.CoverPicture = {
      data : fs.readFileSync(path.join(__dirname+"/../public/Image/Picture/"+req.query.Filename)),
      contentType : path.extname(req.query.Filename).replace('.',""),
    }

    

    const newInfo = new Project().InsertProject(ProjectDocument);
           newInfo.save((err)=>{

            if(err){
              res.status(500).json({
                error : err.message,
              })
            }else{

              // res.status(200).send("inserted successfully")
              res.status(200).redirect("/userend");
            }
           });
          
        })
   

    
  
const errorHandler = require('../Helpers/errorHandler');
  

 router.use(errorHandler);



module.exports = router;