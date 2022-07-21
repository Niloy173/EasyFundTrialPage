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

const { RemoveData } = require("../../controllers/userend/removedata");
const { GetProfileAvatar } = require("../../helpers/profileAvatar");

/* app object */
const router = express.Router();

router.get(
  "/",
  decorateHtmlResponse("write a story"),
  AuthCheck,
  GetProfileAvatar,
  GetRenderStory
);

router.post(
  "/",
  decorateHtmlResponse("write a story"),
  AuthCheck,
  GetProfileAvatar,
  attachmentUpload,
  doStoryValidator,
  doStoryValidatorHandler,
  PostRenderStory
);

router.get("/back", RemoveData); // when back pressed

module.exports = {
  router,
};
