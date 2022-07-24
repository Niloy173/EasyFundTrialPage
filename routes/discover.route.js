/* package goes here */
const express = require("express");
const {
  decorateHtmlResponse,
} = require("../middlewares/common/decorateHtmlResponse");
const { DecodeInformation } = require("../middlewares/common/LoginCheck");
const { GetProfileAvatar } = require("../helpers/profileAvatar");
const { DiscoverAllProject } = require("../controllers/common/discoverProject");

/* ------------------*/

const router = express.Router();

router.get(
  "/all-projects",
  decorateHtmlResponse("Discover projects"),
  DecodeInformation,
  GetProfileAvatar,
  DiscoverAllProject
);

module.exports = {
  router,
};
