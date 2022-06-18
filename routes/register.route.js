/* require packages */
const express = require("express");
const mongoose = require("mongoose");
const path = require('path');
const url = require("url");
const querryString = require("querystring")

// mongodb user model
const {UserSchema} = require("../models/UserSchema");
const User = new mongoose.model("User",UserSchema);


// mongodb user verification model
const {UserVerificationSchema} = require("../models/UserVerification")
const UserVerification = new mongoose.model("Userverification",UserVerificationSchema);

// require nodemailer file
const {transporter} = require("../helpers/nodemailer_transporter")

//  unique uid
const {v4 : uuidv4} = require("uuid");


// password handler
const bcrypt = require("bcrypt");

// variable


/* app object */
const router = express.Router();

/* middleware */
router.use(express.json());
router.use(express.urlencoded({extended : true}));


router.get("/",(req,res)=>{

  res.render("register");
});

// verified page route
router.get("/verified",(req,res)=>{
  res.sendFile(path.join(__dirname+"./../templates/views/message/confirmation.html"));
})

// verify email route
router.get("/verify/:userId/:uniqueString",(req,res)=>{

  let { userId , uniqueString } = req.params;

  UserVerification
  .find({userId})
  .then((result) => {

    if(result.length > 0)
    {

      const {expiresAt} = result[0];
      const hasheduniqueString = result[0].uniqueString;

      // checking for expired unique string
      if(expiresAt < Date.now())
      {
        // record has expired so we delete it
        UserVerification
            .deleteOne({ userId })
            .then((result) =>{

              // delete the co-responding user
              User.deleteOne({_id : userId})
                    .then(() => {

                      let message = "Link has expired. Please sign up again. ";
                      res.redirect(`/register/verified/error=true&message=${message}`);
                   
                    })
                    .catch((error) => {

                      let message = "Clearing user with expired unique string failed";
                      res.redirect(`/register/verified/error=true&message=${message}`);
                   

                    })

            })
            .catch((error) =>{

              console.log(error);
              let message = "An error occured while clearing expired user verification record";
              res.redirect(`/register/verified/error=true&message=${message}`);
           
            });

      }else{

        // valid record exits so we validate the user
        // first compare the hashed unique string

        
        bcrypt.compare(uniqueString,hasheduniqueString)
                  .then( result => {

                      if(result) {

                        User.updateOne({_id : userId},{verified : true})
                        .then(() => {

                          UserVerification
                          .deleteOne({ userId })
                          .then(() => {

                            res.sendFile(path.join(__dirname, "./../templates/views/message/confirmation.html"));

                          })
                          .catch((error) => {

                            console.log(error)
                            let message = "An error occured while finalizing succssful verification.";
                            res.redirect(`/register/verified/error=true&message=${message}`);
                         
                          })

                        })
                        .catch((error) => {

                          console.log(error)
                          let message = "An error occured while updating the user record";
                          res.redirect(`/register/verified/error=true&message=${message}`);
                       

                        })
                      }else{

                        // existing record but incorrect verification details passed
                        let message = "Invalid verification details passed. Check your inbox.";
                        res.redirect(`/register/verified/error=true&message=${message}`);
                     

                      }
                  })
                  .catch((error) => {

                    let message = "An error occured while comparing unique strings";
                    res.redirect(`/register/verified/error=true&message=${message}`);
                 
                  })



      }


    }else{

      let message = encodeURIComponent("Account record doesn't exist or has been verified already. Please sign up or log in.");
      res.redirect(url.format({

        pathname : "/register/verified/",
        query : {

          error : true,
          message : message,
        }
      }));

    }

  })
  .catch((error) =>{

    console.log(error);
    let message =   "An error occured while checkig for existing user verification record";
    res.redirect(`/register/verified/error=true&message=${message}`);
  })

  
});



router.post("/", async(req,res)=>{

  let {email,password,c_password} = req.body;


  if(email == "" || password == "" || c_password == "")
  {
   res.render("register",{

    message : "Field is empty"
   })
  // }else if(email.split("@")[1] != "diu.edu.bd"){

   
  //   res.render("register",{

  //     message : "Invalid email address"
  //    })
  }else if(password != c_password)
  {

    res.render("register",{

      message : "password doesn't match"
     });

  }else{


        try {

          const hashedPassword = await bcrypt.hash(password,10);

          const SingleUser = await User.findOne({email : email});

          if(SingleUser)
          {
            res.render("register",{

              message : `User already exists with ${email}`
            })
          }else{

            const newUser = new User({

              email : email,
              password : hashedPassword,
              verified : false
            })

           const result =  await newUser.save();

          //  console.log(result)
          sendVerificationEmail(result,res);
           
          }
          
        } catch (error) {

          res.status(500).json({

            error : error.message
          })
          
        }
    
                
      }


    })



const sendVerificationEmail = ({_id,email},res) => {

  // url to be used in the email
  const currenturl = "http://localhost:3000/";

  const uniqueString = uuidv4() + _id;

  // mail option
  const mailOptions = {

    from : process.env.AUTH_EMAIL,
    to : email,
    subject : "Verify Your Email Address",
    html : `<h2> Welcome to Easy Fund </h2>
                   <p> verify your email address to complete the signup and login into your account</p>  
                   <p> This link expires in <b>6 hour </b></p>
                   <p> <a href=${currenturl + "register/verify/" + _id + "/" + uniqueString}> click here </a> to proceed </p>`,

  };

  // hash the unique string
  bcrypt.hash(uniqueString,10)
            .then((hashedString) => {

              // set values in varification collection
              const newVerification = new UserVerification({

                userId : _id,
                uniqueString :hashedString,
                createdAt : Date.now(),
                expiresAt : Date.now() + 21600000,
              })
              
              newVerification
                          .save()
                          .then( () => {

                            transporter.sendMail(mailOptions)
                            .then(() => {

                              // Go to the page to show important message
                              res.sendFile(path.join(__dirname + "./../templates/views/message/ImportantMsg.html"));
                              console.log(`Email send to ${email}`)
                              

                            })
                            .catch((error) => {

                                console.log(error);
                                res.json({

                                  message : "Verification email failed!", 
                                })

                            })


                          })
                          .catch(()=>{

                            res.json({

                              message : "An error occured while saving verification email data !", 
                            })
                          });
                          


            })
            .catch(()=>{

              res.json({

                message : "An error occured while hashing email data !", 
              })

            })

}


module.exports = {

  router,
}

