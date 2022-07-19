/* package goes here */
const express = require("express");
const {
  decorateHtmlResponse,
} = require("../middlewares/common/decorateHtmlResponse");

const { DecodeInformation } = require("../middlewares/common/LoginCheck");

/*----------*/

const router = express.Router();

router.get("/", decorateHtmlResponse("home"), DecodeInformation, (req, res) => {
  console.log(res.locals.userInformation);
  res.render("home");
});

module.exports = {
  router,
};
