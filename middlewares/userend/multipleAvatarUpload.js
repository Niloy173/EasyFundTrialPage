const { uploader } = require("../../helpers/mutipleImageUploader");

function attachmentUpload(req, res, next) {
  const upload = uploader(
    ["image/jpeg", "image/jpg", "image/png"],
    10000000,
    "Only .jpg, jpeg or .png format allowed!"
  );
  // work for uploading the photo into particular folder
  upload.any()(req, res, (err) => {
    if (err) {
      res.render("Forms/WriteStory", {
        error: [
          {
            msg: err.message,
          },
        ],
      });
    } else {
      next();
    }
  });
}

module.exports = {
  attachmentUpload,
};
