const fs = require("fs");
const path = require("path");
const createError = require("http-errors");

const UPLAOD_FOLDER_FOR_COVER = path.join(
  __dirname + "/../" + "/../public/coverPicture/"
);

const ATTACHMENT_PATH = path.join(
  __dirname + "/../" + "/../public/attachments/"
);
// In this page when user's back pressing meaning
// he/she wants to edit the project history
// so remove the coverpicture
// remove the attachment
function RemoveData(req, res, next) {
  fs.readdir(UPLAOD_FOLDER_FOR_COVER, (err, files) => {
    // if (err) throw err;

    for (let file of files) {
      fs.unlink(path.join(UPLAOD_FOLDER_FOR_COVER, file), (err) => {
        if (err) {
          console.log(err.message);
          createError(err);
        }
      });
    }
  });

  fs.readdir(ATTACHMENT_PATH, (err, files) => {
    for (let file of files) {
      fs.unlink(path.join(ATTACHMENT_PATH, file), (err) => {
        if (err) {
          console.log(err.message);
          createError(err);
        }
      });
    }
  });
}

module.exports = {
  RemoveData,
};
