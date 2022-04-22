const express = require('express');
const cookieParser = require('cookie-parser');
const router = express.Router();




router.use(express.json());
router.use(cookieParser());

//google Auth Here
const {OAuth2Client} = require('google-auth-library');
const CLIENT_ID = '996077912258-17f6mjq59eejfc8esl4fug367s92uo41.apps.googleusercontent.com';
const client = new OAuth2Client(CLIENT_ID);


function checkAuthenticated(req, res, next){

  let token = req.cookies['session-token'];
  // console.log(token)

  let user = {};
  async function verify() {
      const ticket = await client.verifyIdToken({
          idToken: token,
          audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
      });
      const payload = ticket.getPayload();
      user.name = payload.name;
      user.email = payload.email;
      user.picture = payload.picture;
      //console.log(user)
    }
    verify()
    .then(()=>{
        req.user = user;
        next();
    })
    .catch(err=>{
      // console.log(err)
       res.render("index");
    })

}

router.route('/')
  .get(checkAuthenticated,(req,res)=>{

    res.render("userend",{user: req.user});
  })



  



module.exports = router;