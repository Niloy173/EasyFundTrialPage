/* external imports */
const express = require("express");

/* internal imports */
const { AuthCheck } = require("../../middlewares/common/LoginCheck");
const { avatarUpload } = require("../../middlewares/userend/avatarUpload");
const {
  decorateHtmlResponse,
} = require("../../middlewares/common/decorateHtmlResponse");
const {
  GetRenderCover,
  PostRenderCover,
} = require("../../controllers/formController/coverPicture");

/* app object */
const router = express.Router();

router.get(
  "/",
  decorateHtmlResponse("Select a picture"),
  AuthCheck,
  GetRenderCover
);

router.post(
  "/",
  decorateHtmlResponse("Select a picture"),
  AuthCheck,
  avatarUpload,
  PostRenderCover
);

module.exports = {
  router,
};
