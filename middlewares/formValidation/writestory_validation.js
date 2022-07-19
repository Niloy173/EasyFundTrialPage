const { check, validationResult } = require("express-validator");

const doStoryValidator = [
  check("title", "Title is required").not().isEmpty(),

  check("story", "Story is required").not().isEmpty(),
];

const doStoryValidatorHandler = function (req, res, next) {
  const error = validationResult(req);
  const mappedError = error.array();

  if (Object.keys(mappedError).length === 0) {
    next();
  } else {
    res.render("Forms/WriteStory", {
      error: mappedError,
    });
  }
};

module.exports = {
  doStoryValidator,
  doStoryValidatorHandler,
};
