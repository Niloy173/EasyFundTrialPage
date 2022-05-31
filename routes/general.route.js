// dependencies
const express = require('express');
const cookieParser = require('cookie-parser');
const { check,  validationResult} = require('express-validator')
const bodyParser = require('body-parser');
const GetDays = require('../Helpers/GetDays');


// objects
const router = express.Router();
const body = bodyParser.urlencoded({extended:true});

// middleware to check user logged in or not
function login_check(req,res,next){

  if(! req.user)
  {
    res.redirect("/auth/login");
  }else{
         next();
  }
}






router.use(express.json())
router.use(cookieParser());

// module scaffolding
let generalInfo = {};


// Creating a middleware where any one
// click or go to "General" section this
// function auyomatically called

// const log = (req,res,next)=>{

//   console.log(`This is General Information section`);
//   next();
// }

// router.use("*",log);


router.route('/')
  .get(login_check,(req,res)=>{

    // console.log(req.get('accept'));
    // console.log(req.baseUrl);
    // console.log(req.path);
    // console.log(req.originalUrl)

    
    // req.accepts('json');
    // console.log(req.accepts('html'));
  res.render("general")
})

  .post(body,[

  check('dates','Date Field is empty')
  .not().isEmpty(),

  check('category','Category Feild is empty')
  .not().isEmpty()


],(req,res)=>{

  const errors = validationResult(req);
 
  

  if(!errors.isEmpty())
  {

    
    // res.json(req.body)

    const alert = errors.array();
    

    res.render("general",{

      alert,
    })


  }else{

    generalInfo.CreationDate = req.body.dates;
    let Days = GetDays(generalInfo.CreationDate);
    generalInfo.Category = req.body.category;
    generalInfo.Amount = req.body.amount;
    generalInfo.ProjectDuartion = Days;

    //console.log(generalInfo);
    

    // res.status(200).json({

    //   generalInfo,
    // })
   
    
    
     res.redirect("/layouts/TakingPicture");
    


  }

  
 
   
 
})

module.exports = {

  router,
  generalInfo,

};