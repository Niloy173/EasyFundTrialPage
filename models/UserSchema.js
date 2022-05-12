// Sechma for the user table

const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({

  email : {

    type : String,
    required : true,
  },

  username : {

     type : String,
     required : true,
  },

  googleId : {

    type : String,
    required : true,
  },

  picturelink : {

    type : String,
    required : true,
  },

  picture : {

    data : Buffer,
    contentType : String,
  }



})

UserSchema.methods = {

  GetUserDetails : function(id)
  {
    return mongoose.model("user").find({_id:id});

  }
}

module.exports = UserSchema