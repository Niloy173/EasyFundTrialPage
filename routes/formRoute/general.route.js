/* external imports */
const express = require("express");

/* internal imports */
const {
  decorateHtmlResponse,
} = require("../../middlewares/common/decorateHtmlResponse");
const {
  GetRenderGeneral,
  PostRenderGeneral,
} = require("../../controllers/formController/general");
const { AuthCheck } = require("../../middlewares/common/LoginCheck");
const {
  doGeneralValidation,
  doGeneralValidationHandler,
} = require("../../middlewares/formValidation/genral_validation");

const { GetProfileAvatar } = require("../../helpers/profileAvatar");

/* app objcet*/
const router = express.Router();

router.get(
  "/",
  decorateHtmlResponse("General Settings"),
  AuthCheck,
  GetProfileAvatar,
  GetRenderGeneral
);

router.post(
  "/",
  decorateHtmlResponse("General Settings"),
  AuthCheck,
  GetProfileAvatar,
  doGeneralValidation,
  doGeneralValidationHandler,
  PostRenderGeneral
);

module.exports = {
  router,
};
