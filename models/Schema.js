// Sechema for the project Table

const mongoose = require('mongoose');

const Schema = mongoose.Schema({

  OwnerId : {

    type : String,
    required : true,
  },

  Amount : {

      type : String,
      required: true,

  },

  Validity :{

    type : String,
    required : true,

  },

  StoryTitle : {

    type : String,
    required: true,
  },

  MainStory : {

    type : String,
    required: true,

  },

  Category : {

    type : String,
    required : true,

  },

  CoverPicture: {

    data : Buffer,
    contentType: String,
  }
  

});


Schema.methods = {

  InsertProject : function(obj)
  {
      const newProject = mongoose.model("projectinfo");
      return newProject(obj);
  },

  ShowProject : function(cb)
  {
    return mongoose.model("projectinfo").find({},cb);
  },

 


}





Schema.statics = {

  ByCategoryName : function(name)
  {
      return this.find({Category : name});
  }
  
}



module.exports = Schema;