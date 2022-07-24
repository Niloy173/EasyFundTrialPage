/* external packages */
const express = require("express");

/* internal packages */
const {
  decorateHtmlResponse,
} = require("../../middlewares/common/decorateHtmlResponse");

const { DecodeInformation } = require("../../middlewares/common/LoginCheck");
const { GetProfileAvatar } = require("../../helpers/profileAvatar");
const { GetTheMainStory } = require("../../controllers/mainStory/mainStory");
const { GetSupportPage } = require("../../controllers/mainStory/support");

/* app object */
const router = express.Router();

router.get(
  "/:id",
  decorateHtmlResponse("Story page"),
  DecodeInformation,
  GetProfileAvatar,
  GetTheMainStory
);

router.get(
  "/:id/payment",
  decorateHtmlResponse("Payment page"),
  DecodeInformation,
  GetProfileAvatar,
  GetSupportPage
);

module.exports = {
  router,
};
