function GetRenderPersonalInfo(req, res, next) {
  res.render("userend/personal_info");
}

function PostPersonalInfo(req, res, next) {
  res.status(200).json({
    message: "success",
  });
}

module.exports = {
  GetRenderPersonalInfo,
  PostPersonalInfo,
};
