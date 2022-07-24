/* external imports */
const express = require("express");
/* internal imports */
const {
  decorateHtmlResponse,
} = require("../../middlewares/common/decorateHtmlResponse");

const { DecodeInformation } = require("../../middlewares/common/LoginCheck");

const { GetProfileAvatar } = require("../../helpers/profileAvatar");

const {
  GetMeBusinessProjects,
} = require("../../controllers/categories/business");

// app object
const router = express.Router();

router.get(
  "/business-projects",
  decorateHtmlResponse("Business projects"),
  DecodeInformation,
  GetProfileAvatar,
  GetMeBusinessProjects
);

module.exports = {
  router,
};
