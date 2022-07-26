const { User } = require("../../models/UserSchema");
const { Project } = require("../../models/ProjectSchema");

async function GetTheMainStory(req, res, next) {
  try {
    // catch the project id
    const projectId = req.params.id;
    // console.log(projectId);

    // destructure Owner information
    const ProjectInformation = await Project.find({ _id: projectId });

    const [OwnerId] = ProjectInformation.map((item) => item.OwnerId);
    const [Attachments] = ProjectInformation.map((item) => item.Attachments);
    const [Supporter] = ProjectInformation.map((item) => item.Supporter);
    // console.log(Supporter);

    const SupporterProfile = [];
    if (Supporter) {
      // traverse each object
      Supporter.forEach(async (id) => {
        const supportId = id;

        // get the profile from user database;
        const CurrentUserProfile = await User.find({ _id: supportId });

        const profileImage = CurrentUserProfile[0].profileImage;
        const user_name = CurrentUserProfile[0].fullname || "";

        SupporterProfile.push({ profileImage, user_name });
      });
    }

    //find out Owner information
    const OwnerInformation = await User.find({ _id: OwnerId.id });
    // console.log(OwnerInformation);

    // for the support Button show or not
    // except the owner everyone can support
    let OtherUser;
    if (req.user) {
      // any user logged in
      if (req.user.userId != OwnerId.id) {
        // support section enabled
        OtherUser = "Support";
      }
    } else {
      OtherUser = "Support";
    }

    // project url
    let RequestedUrl = `${process.env.APP_URL}` + req.originalUrl;

    res.status(200).render("mainStory/story", {
      ProjectInformation,
      OtherUser,
      RequestedUrl,
      Owner_name: OwnerInformation[0].fullname,
      OwnerAvatar: OwnerInformation[0].profileImage,
      Owner_university: OwnerInformation[0].university_Name,
      AttachmentLength: Attachments.length,
      SupporterLength: SupporterProfile.length,
      SupporterProfile,
    });
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  GetTheMainStory,
};
