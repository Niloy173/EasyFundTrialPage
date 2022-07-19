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

/* app objcet*/
const router = express.Router();

router.get(
  "/account",
  decorateHtmlResponse("account"),
  AuthCheck,
  doRenderAccount
);

router.post(
  "/account",
  AuthCheck,
  avatarUpload,
  doSettingsValidator,
  doSettingsValidatorHandler,
  UpdateAccountInformation
);

module.exports = {
  router,
};
