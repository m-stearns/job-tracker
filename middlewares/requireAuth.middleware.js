const { User } = require("../models");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers["x-auth-token"];
    const user = await User.findByToken(token);
    if (!user) {
      res.redirect("/login");
    }
    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).send();
  }
};
