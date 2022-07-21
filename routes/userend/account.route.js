/* external imports */
const express = require("express");

/* internal imports */
const {
  decorateHtmlResponse,
} = require("../../middlewares/common/decorateHtmlResponse");

const { AuthCheck } = require("../../middlewares/common/LoginCheck");

const { doRenderAccount } = require("../../controllers/userend/account");

const { avatarUpload } = require("../../middlewares/userend/profileUpload");

const {
  doSettingsValidator,
  doSettingsValidatorHandler,
} = require("../../middlewares/formValidation/settings_validation");

const {
  UpdateAccountInformation,
} = require("../../controllers/userend/account");

const { GetProfileAvatar } = require("../../helpers/profileAvatar");

/* app objcet*/
const router = express.Router();

router.get(
  "/account",
  decorateHtmlResponse("account"),
  AuthCheck,
  GetProfileAvatar,
  doRenderAccount
);

router.post(
  "/account",
  decorateHtmlResponse("account"),
  AuthCheck,
  GetProfileAvatar,
  avatarUpload,
  UpdateAccountInformation
);

module.exports = {
  router,
};
