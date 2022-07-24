const { User } = require("../../models/UserSchema");

async function GetRenderCover(req, res, next) {
  const result = await User.find({ email: req.user.useremail });
  if (!result[0].InformationCollected) {
    // Go and Fill up all required information for user
    res.redirect("/personal/information");
  } else {
    // Already information collected
    res.render("Forms/CoverPicture");
  }
}

function PostRenderCover(req, res, next) {
  res.redirect("/story");
}

module.exports = {
  GetRenderCover,
  PostRenderCover,
};
