/* package goes here */
const express = require('express');
const {AuthCheck} = require("../helpers/LoginCheck");
const cookieParser = require("cookie-parser")
/*----------*/



const router = express.Router();

router.use(express.json())
router.use(cookieParser())

router.get("/",AuthCheck,(req,res)=>{

 
  res.render("protected",{

    userId : req.userId,
    email : req.useremail,
  });
 
})


module.exports = {

  router,
}