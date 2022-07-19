/* external imports */
const express = require("express");

/* internal imports */
const {
  decorateHtmlResponse,
} = require("../../middlewares/common/decorateHtmlResponse");

const { AuthCheck } = require("../../middlewares/common/LoginCheck");

const {
  GetRenderPreview,
} = require("../../controllers/formController/preview");

/* app object */
const router = express.Router();

router.get(
  "/",
  decorateHtmlResponse("preview story"),
  AuthCheck,
  GetRenderPreview
);

module.exports = {
  router,
};
