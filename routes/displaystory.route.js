const express = require('express');
const router = express.Router();
const {Project,User} = require("../db/usefulInfo");

router.use(express.json())

router.get("/project/:id",  (req,res)=>{

  const  projectId = req.params.id;  // Getting from the query parameter on url
 

  Project.find({_id : projectId}) // finding the project info while target is mainly OwnerId
  .exec((err,data)=>{

    if(err)
    {
      res.status(500).send("There's some error in your request")

    }else{

    
      const [OwnerId] = data.map(item => item.OwnerId)
    

      User.find({_id : OwnerId}) // Searching the Owner of the Current Project
      .select({googleId : 0})
      .exec((err,data2)=>{

        if(err)
        {

          res.status(500).send("There's some error in your request")

        }else{

          const [username] = data2.map(item => item.username);
          const [picturelink] = data2.map(item => item.picturelink);
          const [picture] = data2.map(item => item.picture);
         
      

          let   OtherUser; // meaning open support for other user not the owner of the user
        
          if(req.user)
          {
            if(req.user._id  != OwnerId)
            {
              OtherUser = "Support"
            }

          }else{

            OtherUser = "Support"
          }
    
        
          let RequestedUrl = "http://localhost:3000"+req.originalUrl;

         
          


          res.render("projectstory",{
            data, // all the information regarding project
            username, // owner of the project
            picturelink, // owner picture
            OtherUser, // option to render for support
            RequestedUrl, // For sharing the project
            picture,// if any case user updated his/her picture
            


          });
      
      
        }


      });

      

      
    }
  
  })




})



module.exports = {

  router
}