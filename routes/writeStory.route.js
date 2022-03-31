const exprees = require('express');
const { check,  validationResult} = require('express-validator')
const bodyParser = require('body-parser');
const router = exprees.Router();



const body = bodyParser.urlencoded({extended:false});

router.route('/')
  .get((req,res)=>{

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

      res.redirect("layouts/previewPage");
    }
  })

module.exports = router;