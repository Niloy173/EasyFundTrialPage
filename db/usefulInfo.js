const mongoose = require('mongoose');
const path = require('path');

/* copy this Project when you need to get or update or even delete from database */
/* Get this as a reference from any of the js file where you want to play with the Database */

const schema = require(path.join(__dirname+"/../"+"/models/Schema"));
const userschema = require(path.join(__dirname+"/../"+"/models/UserSchema"));

const Project = new mongoose.model("projectinfo",schema);
const User = new mongoose.model("user",userschema);





module.exports =  {

 
  Project,
  User,
}
