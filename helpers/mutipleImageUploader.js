const path = require("path");
const fs = require("fs");
const multer = require("multer");
const createError = require("http-errors");

// File upload folder
const UPLOADS_FOLDER = `${__dirname}/../public/attachments/`;

function check() {
  fs.readdir(UPLOADS_FOLDER, (err, files) => {
    for (const file of files) {
      fs.unlink(path.join(UPLOADS_FOLDER, file), (err) => {
        if (err) createError("File Error"); // Not efficient
      });
    }
  });
}

function uploader(allowed_file_types, max_file_size, error_msg) {
  // first empty the uploads file if there is any file exits
  check();

  // define the storage
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, UPLOADS_FOLDER);
    },
    filename: (req, file, cb) => {
      const fileExt = path.extname(file.originalname);
      const fileName =
        file.originalname
          .replace(fileExt, "")
          .toLowerCase()
          .split(" ")
          .join("-") +
        "-" +
        Date.now() +
        fileExt;

      cb(null, fileName);
    },
  });

  // preapre the final multer upload object
  const upload = multer({
    storage: storage,
    limits: {
      fileSize: max_file_size,
    },
    fileFilter: (req, file, cb) => {
      if (allowed_file_types.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new Error(error_msg));
      }
    },
  });

  return upload;
}

module.exports = {
  uploader,
};
