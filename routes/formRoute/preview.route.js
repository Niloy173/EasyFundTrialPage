/* external imports */
const express = require("express");

/* internal imports */
const {
  decorateHtmlResponse,
} = require("../../middlewares/common/decorateHtmlResponse");

const { AuthCheck } = require("../../middlewares/common/LoginCheck");

const {
  GetRenderPreview,
  PostPreviewProject,
} = require("../../controllers/formController/preview");

/* app object */
const router = express.Router();

router.get(
  "/",
  decorateHtmlResponse("preview story"),
  AuthCheck,
  GetRenderPreview
);

router.post(
  "/",
  decorateHtmlResponse("preview story"),
  AuthCheck,
  PostPreviewProject
);
module.exports = {
  router,
};
