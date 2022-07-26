/* external imports */
const express = require("express");

/* internal imports */

const {
  decorateHtmlResponse,
} = require("../../middlewares/common/decorateHtmlResponse");
const {
  DecodeInformation,
  AuthCheck,
} = require("../../middlewares/common/LoginCheck");

const { GetProfileAvatar } = require("../../helpers/profileAvatar");

const {
  doValidatePersonal,
  doValidatePersonalHandler,
} = require("../../middlewares/formValidation/personal_identity_validate");

const {
  GetRenderPersonalInfo,
  PostPersonalInfo,
} = require("../../controllers/userend/personalIdentity");

/* app object */
const router = express.Router();

router.get(
  "/information",
  decorateHtmlResponse("personal"),
  DecodeInformation,
  GetProfileAvatar,
  GetRenderPersonalInfo
);

router.post(
  "/information",
  AuthCheck,
  doValidatePersonal,
  doValidatePersonalHandler,
  PostPersonalInfo
);

module.exports = {
  router,
};
