const exprees = require('express');
const url = require('url');
const path = require('path');
const fs = require('fs');
const { check,  validationResult} = require('express-validator')
const bodyParser = require('body-parser');
const router = exprees.Router();


const {generalInfo} = require('./general.route');
const updated_path = "/img/Picture/";
let FullPath,filename;



const body = bodyParser.urlencoded({extended:true});


// middleware to check user logged in or not
function login_check(req,res,next){

  if(! req.user)
  {
    res.redirect("/login");
  }else{

    next();
  }
}



router.route('/')
  .get(login_check,(req,res)=>{


    res.render("layouts/writeStory");
  })

  .post(body,[

    check('Title','Title field is empty')
    .not().isEmpty(),






  ],(req,res,next)=>{

    let error = validationResult(req);

    if(!error.isEmpty())
    {

      const alert = error.array();

      res.render("layouts/writeStory",{

        alert
      })

    }else{

 
      let Main_story = req.body.story;


      FullPath  = fs.readdirSync(__dirname+"/../"+"/public/Image/Picture/"); // Synchronous or asynchronous shouldn't be an issu
      filename = FullPath[0];
      
      FullPath = path.join(updated_path,FullPath[0]);


      setTimeout(() => {

        res.redirect(url.format({

          pathname : "/layouts/PreviewStory",
          
         
  
            query : {
  
              "StoryTitle" : req.body.Title,
               Main_story,
              "Amount" : generalInfo.Amount,
             "Validity": generalInfo.ProjectDuartion,
             "Category": generalInfo.Category,
             "FullPath":FullPath,
             "Filename":filename,
           
             
            }
  
  
          
        }));
        
      }, 1000);

   


      
      // res.redirect("/layouts/PreviewStory");

    }

    
  });





  

module.exports = {
  router,
  
}