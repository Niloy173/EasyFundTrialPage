const { check, validationResult } = require("express-validator");

const doValidatePersonal = [
  check("fullname")
    .isLength({ min: 1 })
    .withMessage("Fullname is required")
    .isAlpha("en-US", { ignore: " -" })
    .withMessage("fullname must not contain anything other than alphabet")
    .trim(),

  check("address").not().isEmpty().withMessage("Address is required").trim(),
];

const doValidatePersonalHandler = function (req, res, next) {
  const error = validationResult(req);
  const mappedError = error.mapped();

  if (Object.keys(mappedError).length === 0) {
    next();
  } else {
    res.status(500).json({
      errors: mappedError,
    });
  }
};

module.exports = {
  doValidatePersonal,
  doValidatePersonalHandler,
};
