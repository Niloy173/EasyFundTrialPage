/* external imports */
const express = require("express");

/* internal imports */
const {
  decorateHtmlResponse,
} = require("../../middlewares/common/decorateHtmlResponse");
const { AuthCheck } = require("../../middlewares/common/LoginCheck");
const {
  GetRenderStory,
  PostRenderStory,
} = require("../../controllers/formController/writeStory");

const {
  attachmentUpload,
} = require("../../middlewares/userend/multipleAvatarUpload");

const {
  doStoryValidator,
  doStoryValidatorHandler,
} = require("../../middlewares/formValidation/writestory_validation");

/* app object */
const router = express.Router();

router.get(
  "/",
  decorateHtmlResponse("write a story"),
  AuthCheck,
  GetRenderStory
);

router.post(
  "/",
  decorateHtmlResponse("write a story"),
  AuthCheck,
  attachmentUpload,
  doStoryValidator,
  doStoryValidatorHandler,
  PostRenderStory
);

module.exports = {
  router,
};
