const path = require("path");
const fs = require("fs");
const { User } = require("../../models/UserSchema");

async function doRenderAccount(req, res, next) {
  const CurrentUser = await User.find({ _id: req.user.userId });
  res.render("userend/account", {
    CurrentUser,
  });
}

async function UpdateAccountInformation(req, res, next) {
  if (req.file) {
    // read the file first which is profile picture
    const FullPath = fs.readdirSync(
      path.join(__dirname + "/../" + "/../public/profilePicture/")
    )[0];
    const ext_name = path.extname(FullPath);

    const UserUpdate = await User.updateOne(
      { _id: req.user.userId },
      {
        $set: {
          username: req.body.username.trim(),
          profile: FullPath,
        },
      },
      { new: true, useFindAndModify: false }
    );

    setTimeout(() => {
      res.clearCookie(process.env.COOKIE_NAME);
      res.redirect("/login");
    }, 1000);
  } else if (req.body.username) {
    const UserUpdate = await User.updateOne(
      { _id: req.user.userId },
      {
        $set: {
          username: req.body.username.trim(),
        },
      },
      { new: true, useFindAndModify: false }
    );

    setTimeout(() => {
      res.clearCookie(process.env.COOKIE_NAME);
      res.redirect("/login");
    }, 1000);
  } else {
    res.redirect("/user/account");
  }
}

module.exports = {
  doRenderAccount,
  UpdateAccountInformation,
};
