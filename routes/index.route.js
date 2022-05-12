const express = require('express');
const router = express.Router();
const {Project} = require('../db/usefulInfo')


router.use(express.json());



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

          /* now we'll check if user authenticated  or not */
          /* if authenticated then render user page otherwise homepage */

           if(!req.user)
           {
            res.render("index",{

            
              data
            });
          

           }else{

            res.redirect("/userend")
           
           }
          
        }

        });




}



router.get("/",GetData)



  



module.exports = router;