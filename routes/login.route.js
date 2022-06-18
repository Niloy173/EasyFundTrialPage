/* require packages */
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/* user database model */
const {UserSchema} = require("../models/UserSchema");
const User = new mongoose.model("User",UserSchema);

/* app object */
const router = express.Router();

/* middleware */
router.use(express.json());
router.use(express.urlencoded({extended : true}));


router.get("/",(req,res)=>{

  res.render("login");
});

router.post("/",(req,res) => {

  let {email,password} = req.body;

  if(email == "" || password == "")
  {
    res.render("register",{

      message : "Field is empty"
     })
  }else{

    User.find({ email : email })
            .then((data) => {

              if(data.length)
              {

                // check the verification status
                if(! data[0].verified)
                {
                  res.render("login",{

                    message : "Email hasn't been verified. check your inbox",
                  })
                  
                }else{

                  const hashedPassword = data[0].password;
                  bcrypt.compare(password,hashedPassword)
                  .then((result) => {
  
                    if(result){
  
                      // res.redirect("/")
                      const token = jwt.sign({

                        useremail : data[0].email,
                        userId : data[0]._id
                        
                      },process.env.JWT_TOKEN,{

                        expiresIn : "24h"

                      });

                      
                      res.cookie("easyfund",token,{

                        expires : new Date(Date.now() + 86400000),
                        httpOnly : true,
                      })


                      console.log(token)
                      res.redirect("/");
                    }else{

                      res.render("login",{

                        message : "password is incorrect!",
                      })
                    }
                  })
                  .catch((error) => {
  
                    res.render("login",{
  
                      message : "An error occured while comparing password",
                    })
                  })

                }

              }else {

                res.render("login",{

                  message : "Invalid credentials entered!",
                })

              }

            })
            .catch((error) => {

              console.log(error);
              res.render("login",{

                message : "An error occured while checking for exisiting user",
              })
            })

  }
})

module.exports = {

  router,
}

