const jwt = require("jsonwebtoken");


const AuthCheck = (req,res,next)=>{

  // // console.log(req.headers);
  // console.log(req.cookies)
  const token = req.cookies.easyfund;


  try {
    const decoded = jwt.verify(token,process.env.JWT_TOKEN);
    const {useremail,userId} = decoded;
    req.useremail = useremail
    req.userId = userId
    next();
    
  } catch (error) {
    
    res.redirect("/login")

  }


}

module.exports = {

  AuthCheck
}