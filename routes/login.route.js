const express = require('express');
const cookieParser = require('cookie-parser');
const router = express.Router();




router.use(express.json());
router.use(cookieParser());

//google Auth Here
const {OAuth2Client} = require('google-auth-library');
const CLIENT_ID = '996077912258-17f6mjq59eejfc8esl4fug367s92uo41.apps.googleusercontent.com';
const client = new OAuth2Client(CLIENT_ID);

router.route('/')
    .get((req,res)=>{

      res.render("login");
    })
    .post((req,res)=>{

      let token = req.body.token;
     // console.log(token)

      async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        });
        const payload = ticket.getPayload();// holds userInformation
        const userid = payload['sub'];
        // console.log(payload);
      }
      verify()
      .then(()=>{
          res.cookie('session-token', token);
          res.send('success')
      })
      .catch(console.error);

      
    })









    
module.exports = {
  router,
 
}