/* package goes here */
const express = require("express");
const { AuthCheck } = require("../middlewares/common/LoginCheck");

const { logout } = require("../controllers/userend/logout");
/*----------*/

const router = express.Router();

router.get("/", AuthCheck, (req, res) => {
  res.render("protected", {
    userId: req.user.userId,
    email: req.user.useremail,
  });
});

router.delete("/", logout);

module.exports = {
  router,
};
