function GetRenderCover(req, res, next) {
  res.render("Forms/CoverPicture");
}

function PostRenderCover(req, res, next) {
  res.redirect("/story");
}

module.exports = {
  GetRenderCover,
  PostRenderCover,
};
