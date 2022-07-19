const { check, validationResult } = require("express-validator");
const createError = require("http-errors");
const { User } = require("../../models/UserSchema");
const { unlink } = require("fs");

const doSettingsValidator = [
  check("username")
    .isLength({ min: 1 })
    .withMessage("username is required")
    // .isAlpha("en-US", { ignore: " -" })
    // .withMessage("username must not contain anything other than alphabet")
    .trim()
    .custom(async (value) => {
      const user = await User.find({ username: value });

      if (user.length > 1) {
        throw createError("username already exists");
      }
    }),
];

const doSettingsValidatorHandler = async function (req, res, next) {
  const errors = validationResult(req);
  const mappederror = errors.mapped();

  if (Object.keys(mappederror).length === 0) {
    next();
  } else {
    // if (req.file) {
    //   const { filename } = req.file.filename;
    //   console.log(filename);
    //   unlink(
    //     path.join(__dirname, `/../public/uploads/avatars/${filename}`),
    //     (err) => {
    //       if (err) console.log(err);
    //     }
    //   );
    // }

    const CurrentUser = await User.find({ _id: req.user.userId });

    // response the error
    res.render("userend/account", {
      message: mappederror.username.msg,
      CurrentUser,
    });
  }
};

module.exports = {
  doSettingsValidator,
  doSettingsValidatorHandler,
};
