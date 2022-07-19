function logout(req, res, next) {
  res.clearCookie(process.env.COOKIE_NAME);
  res.send("logging out");
}

module.exports = {
  logout,
};
