const fs = require("fs");
const path = require("path");
const { User } = require("../../models/UserSchema");

async function GetRenderPreview(req, res, next) {
  //current User information
  const CurrentUser = await User.find({ _id: req.user.userId });

  res.render("Forms/Preview", {
    // project related information
    Amount: req.query.Amount,
    Validity: req.query.Validity,
    Catgory: req.query.Category,
    CoverPicture: req.query.Filename,
    StoryTitle: req.query.StoryTitle,
    MainStory: req.query.MainStory,
    Attachment: req.query.attachment,

    // user related Information
    fullname: CurrentUser[0].fullname,
    picture: CurrentUser[0].profile,
    university: CurrentUser[0].university_Name,
  });
}

module.exports = {
  GetRenderPreview,
};
