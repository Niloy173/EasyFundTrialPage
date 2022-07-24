const mongoose = require("mongoose");

const SupportSchema = mongoose.Schema(
  {
    Project: {
      id: mongoose.Types.ObjectId,
      title: String,
    },

    Supporter: [
      {
        id: mongoose.Types.ObjectId,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Support = mongoose.model("Support", SupportSchema);
module.exports = {
  Support,
};
