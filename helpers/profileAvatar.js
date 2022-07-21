const { User } = require("../models/UserSchema");

async function GetProfileAvatar(req, res, next) {
  try {
    const CurrentUser = await User.findOne({ _id: req.user.userId });
    // console.log(CurrentUser.profileImage);

    res.locals.profileImage = CurrentUser.profileImage;
  } catch (error) {
    console.log(error.message); // encountered when user tried to logout
  }

  next();
}

module.exports = {
  GetProfileAvatar,
};
