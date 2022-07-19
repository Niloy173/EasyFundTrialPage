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

/* app objcet*/
const router = express.Router();

router.get(
  "/",
  decorateHtmlResponse("General Settings"),
  AuthCheck,
  GetRenderGeneral
);

router.post(
  "/",
  decorateHtmlResponse("General Settings"),
  AuthCheck,
  doGeneralValidation,
  doGeneralValidationHandler,
  PostRenderGeneral
);

module.exports = {
  router,
};
