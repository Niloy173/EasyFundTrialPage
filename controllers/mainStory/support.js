const { Project } = require("../../models/ProjectSchema");
const { User } = require("../../models/UserSchema");
const createError = require("http-errors");

async function GetSupportPage(req, res, next) {
  try {
    const curentProject_Id = String("http://localhost:3000" + req.originalUrl)
      .split("/")
      .reverse()[1];

    // get the title and coverpicture
    const CurrentProjectData = await Project.findOne({ _id: curentProject_Id });

    // Need CurrentUser phone number
    if (req.user) {
      const CurrentUser = await User.findOne({ _id: req.user.userId });

      res.status(200).render("mainStory/support", {
        CoverPicture: CurrentProjectData.CoverPicture,
        StoryTitle: CurrentProjectData.StoryTitle,
        PhoneNumber: CurrentUser.phone,
      });
    } else {
      res.status(200).render("mainStory/support", {
        CoverPicture: CurrentProjectData.CoverPicture,
        StoryTitle: CurrentProjectData.StoryTitle,
        PhoneNumber: undefined,
      });
    }
  } catch (error) {
    console.log(error.message);
    throw createError(error);
  }
}

module.exports = {
  GetSupportPage,
};
