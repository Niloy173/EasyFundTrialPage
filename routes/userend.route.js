const express = require('express');
const router = express.Router();
const {Project} = require("../db/usefulInfo");
const ErrorHandler =require("../Helpers/errorHandler");


function GetData(req,res,next)
{
   Project.find({})
     
      .select({})
      .limit(8)
      .exec((err,data)=>{
  
        if(err){
          res.status(500).json({
            error : "There was an error in your request"
          });
          
        }else{

         
            res.render("userend",{
              username : req.user.username,
              picturelink : req.user.picturelink,
              picture : req.user.picture ? req.user.picture : undefined,
              data,
            
            });
         
        }

        });




}



router.get("/",GetData);

module.exports ={

  router,
}