const exprees = require('express');
const url = require('url');
const { check,  validationResult} = require('express-validator')
const bodyParser = require('body-parser');
const router = exprees.Router();
const {checkAuthenticated} = require('../Helpers/Information');

const {generalInfo} = require('./general.route');


var Title_story = "";



const body = bodyParser.urlencoded({extended:false});


router.route('/')
  .get(checkAuthenticated,(req,res)=>{


    res.render("layouts/writeStory");
  })

  .post(body,[

    check('Title','Title field is empty')
    .not().isEmpty(),




  ],(req,res)=>{

    let error = validationResult(req);

    if(!error.isEmpty())
    {

      const alert = error.array();

      res.render("layouts/writeStory",{

        alert
      })

    }else{

      // console.log(req.body)
      // res.status(200).json({

      //   Data : req.body,
      // })

      Title_story = req.body.Title;

   


      
      // res.redirect("/layouts/PreviewStory");
      res.redirect(url.format({

        pathname : "/layouts/PreviewStory",
        
        query : {

          "StoryTitle" : Title_story,
          "Amount" : generalInfo.Amount,
         "Validity": generalInfo.ProjectDuartion,
         "Category": generalInfo.Category,

         
        }
      }));
    }
  });



module.exports = {
  router,
  
}