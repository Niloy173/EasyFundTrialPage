const express = require('express');
const router = express.Router();
const {Project,User} = require("../db/usefulInfo")




router.get("/my-project",(req,res)=>{
            Project.find({OwnerId :  req.user._id})
            .select({MainStory : 0})
            .exec((err,data)=>{

              if(err){
                res.status(500).json({
                  error : "There was an error in your request"
                });
                
              }else{
      
               
                 
                  res.render("userproject",{
                    username : req.user.username,
                    picturelink : req.user.picturelink,
                    picture : req.user.picture ? req.user.picture : undefined,
                    data,
                  
                  });
               
              }

            });
        

          });

//  router.get("/my-project/:id",(req,res)=>{

   
//     if(req.params.id === "no")
//     {
//       res.redirect("/user/my-project");
    
//     }else{

      
//       Project.deleteOne({_id : req.params.id})
//       .then((success)=>{

//         if(success)
//         {
//           console.log(`Deleted Successfully`);
//           res.redirect("/user/my-project")
         
//         }else{

//           res.status(500).send("There was an error occured while deleting the project");
          
//         }
        
//       });

//     }

//   })
module.exports = {

  router
}