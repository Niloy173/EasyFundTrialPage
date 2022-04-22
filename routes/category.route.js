const express = require('express');
const categoryRouter = express.Router();



categoryRouter.param('category_num',(req,res,next,id)=>{

  if(id === "1")
  {
    req.categoryType = "Business";
    res.render("category/business");
  
  }

  else if( id === "2")
  {
    req.categoryType = "Study Abroad";
    res.render("category/study_abroad");
    
  }

  next();
});

categoryRouter.get('/:category_num',(req,res)=>{

  console.log(req.categoryType);
})




module.exports = categoryRouter;