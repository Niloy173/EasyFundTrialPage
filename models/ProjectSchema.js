/* porject database design */

const mongoose = require("mongoose");

const ProjectSchema = mongoose.Schema(
  {
    OwnerId: {
      id: mongoose.Types.ObjectId,
    },

    TargetAmount: {
      type: String,
      required: true,
    },

    CurrentAmount: {
      type: Number,
      required: true,
    },

    Validity: {
      type: String,
      required: true,
    },

    StoryTitle: {
      type: String,
      required: true,
    },

    MainStory: {
      type: String,
      required: true,
    },

    Category: {
      type: String,
      required: true,
    },

    CoverPicture: {
      data: Buffer,
      contentType: String,
    },

    Attachments: [
      {
        data: Buffer,
        contentType: String,
      },
    ],

    CreationDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

ProjectSchema.methods = {
  InsertProject: function (obj) {
    const newProject = mongoose.model("Project");
    return newProject(obj);
  },

  ShowAllProject: function (cb) {
    return mongoose.model("Project").find({}, cb);
  },
};

ProjectSchema.statics = {
  FindByCategoryName: function (name) {
    return this.find({ Category: name }).sort("-createdAt");
  },
};

const Project = new mongoose.model("Project", ProjectSchema);

module.exports = {
  Project,
};
