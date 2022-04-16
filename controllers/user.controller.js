const { User } = require("../models");

class UserController {
  static async create(req, res) {
    try {
      const { name, email, password } = req.body;

      const user = await User.create({ name, email, password });

      res.json({ user, auth_token: user.genAuthToken() });
    } catch (error) {
      res.status(400).send({ error });
    }
  }
}

module.exports = { UserController };
