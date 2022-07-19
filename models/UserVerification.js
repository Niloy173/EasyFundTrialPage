const mongoose = require("mongoose");

const UserVerificationSchema = new mongoose.Schema({
  userId: String,
  uniqueString: String,
  createdAt: Date,
  expiresAt: Date,
});

const UserVerification = new mongoose.model(
  "Userverification",
  UserVerificationSchema
);

module.exports = {
  UserVerification,
};
