const path = require("path");
const url = require("url");
const fs = require("fs");

const { User } = require("../../models/UserSchema");

const {
  GeneralInformation,
} = require("../../controllers/formController/general");

async function GetRenderStory(req, res, next) {
  const result = await User.find({ email: req.user.useremail });
  if (!result[0].InformationCollected) {
    // Go and Fill up all required information for user
    res.redirect("/personal/information");
  } else {
    // Already information collected
    res.render("Forms/WriteStory");
  }
}

function PostRenderStory(req, res, next) {
  let FullPath = fs.readdirSync(
    path.join(__dirname + "/../../public/coverPicture/")
  );

  const filename = FullPath[0];

  res.redirect(
    url.format({
      pathname: "/preview",

      query: {
        StoryTitle: req.body.title,
        MainStory: req.body.story,
        Amount: GeneralInformation.Amount,
        Validity: GeneralInformation.DaysRemaining,
        Category: GeneralInformation.Category,
        Filename: filename,
      },
    })
  );
}

module.exports = {
  GetRenderStory,
  PostRenderStory,
};
