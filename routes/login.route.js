const express = require('express');
const passport = require('passport');
const router = express.Router();

router.use(express.json())


router.get("/login",(req,res)=>{

    res.render("login")
})

router.get("/logout",(req,res)=>{

  req.logOut();
  res.redirect("/");
})

router.get("/google",passport.authenticate('google',{

  // this is for checking or constant screen
    scope : ['profile','email']

}));

router.get("/google/redirect",passport.authenticate('google',{failureRedirect : '/auth/google'}),(req,res)=>{

  try {
    
  

    res.redirect("/userend");
    
  } catch (error) {
    
    console.log(error)
  }

})









    
module.exports = {
  router,
 
}