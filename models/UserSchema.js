const mongoose = require("mongoose");

const UserSchema =  mongoose.Schema({

  email : {

    type : String,
    required : true,
  },

  password : {

    type : String,
    required : true,
  },

  verified : {

    type : Boolean,
    required : true,

  },
  profilePicture : {

    type : Buffer
  },

  department : {

    type : String
  },

  university_id : {

    type : String
  }


});

module.exports = {

  UserSchema
}