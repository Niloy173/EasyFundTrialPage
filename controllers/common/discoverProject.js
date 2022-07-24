const { Project } = require("../../models/ProjectSchema");
const CreateError = require("http-errors");

function DiscoverAllProject(req, res, next) {
  new Project().ShowAllProject((err, data) => {
    if (err) {
      throw CreateError(err.message);
    } else {
      res.render("discover", {
        data,
      });
    }
  });
}

module.exports = {
  DiscoverAllProject,
};
