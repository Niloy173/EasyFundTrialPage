const express = require('express');
const cookieParser = require('cookie-parser');
const router = express.Router();
const {checkAuthenticated} = require('../Helpers/Information');

router.use(express.json());
router.use(cookieParser());

router.route('/')
    .get(checkAuthenticated,(req,res)=>{

      let user = req.user;
      //console.log(user);
      res.render("userend",{user});
    })

module.exports ={

  router,
}