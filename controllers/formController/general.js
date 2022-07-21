const { GetDays } = require("../../helpers/GetDays");
const { User } = require("../../models/UserSchema");
let GeneralInformation = {};

async function GetRenderGeneral(req, res, next) {
  const result = await User.find({ email: req.user.useremail });
  // if (!result[0].InformationCollected) {
  //   // Go and Fill up all required information for user
  //   res.redirect("/personal/information");
  // } else {
  // Already information collected
  res.render("Forms/General");
  // }
}

function PostRenderGeneral(req, res, next) {
  GeneralInformation.CreationDate = req.body.date;
  GeneralInformation.DaysRemaining = GetDays(GeneralInformation.CreationDate);
  GeneralInformation.Category = req.body.option;
  GeneralInformation.Amount = req.body.taka;

  res.redirect("/cover");
}
module.exports = {
  GeneralInformation,
  GetRenderGeneral,
  PostRenderGeneral,
};
