const { upload } = require("../../helpers/profileImageUploader");
const { User } = require("../../models/UserSchema");

async function avatarUpload(req, res, next) {
  const CurrentUser = await User.find({ _id: req.user.userId });
  // work for uploading the photo into particular folder
  upload.single("avatar")(req, res, (err) => {
    if (err) {
      res.render("userend/account", {
        message: err.message,
        CurrentUser,
      });
    } else {
      next();
    }
  });
}

module.exports = {
  avatarUpload,
};
