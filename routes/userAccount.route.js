const express = require('express');
const path = require('path');
const fs = require('fs')
const {User} = require('../db/usefulInfo');
const router = express.Router()
const {upload} = require("../Helpers/ImageValidate")

router.use(express.urlencoded({extended:true}))
router.use(express.json());

router.route('/settings')
        .get(async(req,res)=>{

          try {
        
            const userinfo = await new User().GetUserDetails(req.user._id);
            res.render("userAccount",{
        
              userinfo
              
            });
            
          } catch (error) {
            
            console.log(error.message);
          }
              
        })
        .post(upload.single('avatar'),(req,res)=>{

         
          if(req.file)
          {

            
            const FullPath  = fs.readdirSync(__dirname+"/../"+"/public/Image/Picture/")[0];
            const ext = path.extname(FullPath)

           
            setTimeout(() => {


              User.updateOne({_id : req.user._id},{

                $set : {
  
                  username : req.body.uname? req.body.uname : req.user.username,
                  picturelink : "",
                  picture :{
  
                    data : fs.readFileSync(path.join(__dirname+"/../public/Image/Picture/"+FullPath)),
                    contentType : ext,
                  }
  
                }
              },{new : true,
                useFindAndModify : false},
                (err,data)=>{
  
                  if(err)
                  {
                    res.status(500).send(err)
                  }else{
  
                    console.log('updated succefully');
                    res.redirect("/");
                  }
  
                });
  
              
            }, 1000);
         
            
          }else if(req.body.uname!= req.user.username){

            User.updateOne({_id : req.user._id},{

              $set : {

                username : req.body.uname
              }
            },
              {
                new : true,
                useFindAndModify : false
              },
          (err,data)=>{

            if(err)
            {
              res.status(500).send(err)
            }else{

              console.log('updated succefully');
              res.redirect("/");
            }


          });
           
         

          }else{

            console.log('Nothing to update')
            res.redirect("/")
          }

        //  User.updateOne({_id : req.user._id},{

        //   $set : {

        //     username : req.body.uname,

        //   }
        //  })
        

})


module.exports = {

  router
}


