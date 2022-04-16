const { User } = require("../models");

class UserController {
  static async create(req, res) {
    const { name, email, password } = req.body;

    const user = await User.create({ name, email, password });

    res.json({ user, auth_token: user.genAuthToken() });
  }
}

module.exports = {UserController}