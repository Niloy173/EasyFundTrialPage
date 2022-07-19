const { upload } = require("../../helpers/singleImageUploader");

function avatarUpload(req, res, next) {
  // work for uploading the photo into particular folder
  upload.single("avatar")(req, res, (err) => {
    if (err) {
      res.render("Forms/CoverPicture", {
        message: err.message,
      });
    } else {
      if (req.file === undefined) {
        res.render("Forms/CoverPicture", {
          message: "please select a picture",
        });
      } else {
        next();
      }
    }
  });
}

module.exports = {
  avatarUpload,
};
