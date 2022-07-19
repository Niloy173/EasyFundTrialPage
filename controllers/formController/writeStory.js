const path = require("path");
const url = require("url");
const fs = require("fs");

const {
  GeneralInformation,
} = require("../../controllers/formController/general");

function GetRenderStory(req, res, next) {
  res.render("Forms/WriteStory");
}

function PostRenderStory(req, res, next) {
  let attach = [];

  let FullPath = fs.readdirSync(
    path.join(__dirname + "/../../public/coverPicture/")
  );

  const filename = FullPath[0];

  const AttachmentPath = fs.readdirSync(
    path.join(__dirname + "/../../public/attachments/")
  );

  AttachmentPath.forEach((file) => {
    attach.push(file);
  });

  res.redirect(
    url.format({
      pathname: "/preview",

      query: {
        StoryTitle: req.body.title,
        MainStory: req.body.story,
        Amount: GeneralInformation.Amount,
        Validity: GeneralInformation.DaysRemaining,
        Category: GeneralInformation.Category,
        attachment: attach,
        Filename: filename,
      },
    })
  );
}

module.exports = {
  GetRenderStory,
  PostRenderStory,
};
