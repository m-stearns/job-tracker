const { User } = require("../models");

class UserController {
  static async register(req, res) {
    try {
      const { name, email, password } = req.body;

      const user = await User.create({ name, email, password });

      res.json({ user, auth_token: user.genAuthToken() });
    } catch (error) {
      res.status(400).send({ error });
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;

      const user = await User.authenticate(email, password);

      if (!user) {
        return res.status(401).send();
      }

      res.json({ user, auth_token: user.genAuthToken() });
    } catch (error) {
      console.error(error);
      res.status(500).send();
    }
  }

  static async currentUser(req, res) {
    try {
      const token = req.headers["x-auth-token"];
      const user = await User.findByToken(token);
      res.json({ user });
    } catch (error) {
      console.error(error);
      res.status(400).send({ error: error.message });
    }
  }

  // TODO: Remove. Dummy method to test auth middleware
  static protectedResource(req, res) {
    console.log(req.user);
    res.status(200).send(req.user);
  }
}

module.exports = { UserController };
