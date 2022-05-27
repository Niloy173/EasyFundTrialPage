const express = require('express');
const router = express.Router();
const {Project,User} = require("../db/usefulInfo");

router.use(express.json())
router.use(express.urlencoded({extended : true}))

router.get("/project/:id",  (req,res)=>{

  const  projectId = req.params.id;  // Getting from the query parameter on url
 

  Project.find({_id : projectId}) // finding the project info while target is mainly OwnerId
  .exec((err,data)=>{

    if(err)
    {
      res.status(500).send("There's some error in your request")

    }else{

    
      const [OwnerId] = data.map(item => item.OwnerId)

      const [Supporter] = data.map(item => item.Supporter);

      const supporter_profile = [];

       Supporter.forEach((element) => {

              const support_id = element.toString();
            
            
              new User().GetUserDetails(support_id)
              .exec((err,sup_info) =>{
                  if(err)
                  {
                    res.status(400).send("server side error");
                  }else{
            
                    const [picturelink] = sup_info.map(item => item.picturelink);
                    const [username] = sup_info.map(item => item.username);
                    
                   if(picturelink)
                   {
                      supporter_profile.push({picturelink,username});
                  
                   }else{
            
                      const [picture] = sup_info.map(item => item.picture);
                      const picturelink = `data:image/${picture.contentType};base64,${picture.data.toString('base64')} `
                      supporter_profile.push({picturelink,username});
                   }

                  }

                  // console.log(supporter_profile)

                  
              });
            
            });

      User.find({_id : OwnerId}) // Searching the Owner of the Current Project
      .select({googleId : 0})
      .exec((err,data2)=>{ // grab the required user information

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
         


         setTimeout(()=>{

          res.render("projectstory",{
            data, // all the information regarding project
            username, // owner of the project
            picturelink, // owner picture
            OtherUser, // option to render for support
            RequestedUrl, // For sharing the project
            picture,// if any case user updated his/her picture
            supporter_profile, // profile image of each indiviual supporters
            supporters_length : supporter_profile.length, // supporters length
        
          
          });

         },1000)
      
      
        }


      });

      
    }
  
  })




})



router.route("/project/:id/payment")
        .get((req,res)=>{

          const cuurentProject_Id = (String ("http://localhost"+req.originalUrl).split("/").reverse()[1]);
          

          Project.find({_id : cuurentProject_Id})
          .exec((err,info) =>{

              if(err)
              {
                res.status(500).send("There was a server side error");
              }else{

        
                const [StoryTitle] = info.map(item => item.StoryTitle);
                const [CoverPicture]= info.map(item => item.CoverPicture);
              

             

                res.render("AmountSelection",{

                  StoryTitle,
                 CoverPicture,
                  

                })

              }
          })
          
       
        })

        
        .post((req,res)=>{

    
         const amount = req.body["selected-amount"].split("৳")[1].trim(); // getting selected amount
         const projectId = (String ("http://localhost"+req.originalUrl).split("/").reverse()[1]); // abstract the project id
         let ActualAmount =0; // amount counter

         Project.find({_id:projectId})
         .exec((err,pay)=>{

              const [CurrentAmount] = pay.map(item => item.CurrentAmount);
              const [Supporter] = pay.map(item => item.Supporter);

              const supporterId =[];

              // we are not focusing abou the annonymous support yet
              // later we will send a "Thank You" message to each indiviual phone number
              // whom trying to support the project wheither the user is legit or annonymous

              if(Supporter.length == 0 && req.user) // meaning there has benn no contribution to this project yet
              {                                                              // also focasing if user's been login 
                supporterId.push(req.user._id);
              }else{

                let boo = 0; // confirmation if the same user tries to support the same project again

                if(req.user){

                for (let index = 0; index < Supporter.length; index++) {
                  
          
                  if(JSON.stringify(Supporter[index]) === JSON.stringify(req.user._id))
                  {
                      boo =1;
                      console.log('Both are same')
                      break;
                  }else{

                    // console.log(Supporter[index]);
                    supporterId.push(Supporter[index]);
                  }
                  
                }

                if(boo === 0)
                {
                  supporterId.push(req.user._id);
                }
              }

            }

              ActualAmount =  parseInt(amount) + CurrentAmount;
              if(!err)
              {
                Project.updateOne({_id : projectId},


                  {
                    $set : {
        
                      CurrentAmount : ActualAmount,
                      Supporter : supporterId.length === 0 ? Supporter : supporterId,
        
                    }
                    
                  },
        
                  {new : true,
                    useFindAndModify : false},
        
                    (err,data)=>{
        
                      if(err)
                      {
                        res.status(500).send(err)
                      }else{
      
                        console.log('updated amount succefully');


                        // console.log(data);
                        res.redirect("/");
                      }
        
                    });

                  // res.status(200).send({ActualAmount,projectId})
              }
             

         });

       

         

        
        });






  
module.exports = {

  router,
}