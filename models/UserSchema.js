const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      trim: true,
    },

    verified: {
      type: Boolean,
      required: true,
    },

    profile: {
      type: String,
    },

    university_Name: {
      type: String,
    },

    department: {
      type: String,
    },

    mobile: {
      type: String,
    },

    InformationCollected: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = new mongoose.model("Client", UserSchema);

module.exports = {
  User,
};
