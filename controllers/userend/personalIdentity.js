const e = require("express");
const { User } = require("../../models/UserSchema");
const createError = require("http-errors");

async function GetRenderPersonalInfo(req, res, next) {
  try {
    if (req.user) {
      // find the current user information
      const CurrentUser = await User.find({ _id: req.user.userId });
      // console.log(CurrentUser);
      res.render("userend/personal_info", {
        CurrentUser,
      });
    } else {
      res.redirect("/login");
    }
  } catch (error) {
    console.log(error);
    throw createError(error);
  }
}

function PostPersonalInfo(req, res, next) {
  User.findByIdAndUpdate(
    { _id: req.user.userId },
    {
      fullname: req.body.fullname.trim(),
      phone: req.body.phone.trim(),
      university_Name: req.body.universityname.trim(),
      department: req.body.department.trim(),
      university_Id: req.body.universityid.trim(),
      InformationCollected: true,
    },
    function (err, result) {
      if (err) {
        res.status(500).json({
          errors: {
            common: err.message,
          },
        });
      } else {
        //console.log(result);
        res.status(200).json({
          message: "Done",
        });
      }
    }
  );
}

module.exports = {
  GetRenderPersonalInfo,
  PostPersonalInfo,
};
