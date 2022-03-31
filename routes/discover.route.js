const express = require('express');
const router = express.Router();


router.route('/')
  .get((req,res)=>{

    //console.log(req.app.get("view engine"));
    //console.log(`Requwsted url => `+req.baseUrl);
    res.render("discover");
  })



module.exports = router;