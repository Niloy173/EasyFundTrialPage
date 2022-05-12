const errorHandler = (err,req,res,next)=>{

  if(res.headersSent){

      res.status(404).send("Header has already sent")
  }

  if(err.message)
  {
    
    res.status(500).send(err.message);
  }else{

    res.status(500).send("There was an error");
  }

  console.log(err);
}

module.exports = errorHandler