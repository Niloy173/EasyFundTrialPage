/* package goes here */
const express = require("express");
const {
  decorateHtmlResponse,
} = require("../middlewares/common/decorateHtmlResponse");

const { DecodeInformation } = require("../middlewares/common/LoginCheck");
const { logout } = require("../controllers/userend/logout");

const { GetProfileAvatar } = require("../helpers/profileAvatar");
/*----------*/

const router = express.Router();

router.get(
  "/",
  decorateHtmlResponse("home"),
  DecodeInformation,
  GetProfileAvatar,
  (req, res) => {
    res.render("home");
  }
);

router.delete("/", logout);

module.exports = {
  router,
};
