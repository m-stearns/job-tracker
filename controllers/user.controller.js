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
      if (!token) {
        return res.send({ user: null });
      }
      const user = await User.findByToken(token);
      res.json({ user });
    } catch (error) {
      console.error(error);
      res.status(400).send({ error: error.message });
    }
  }

  static async addSkill(req, res) {
    try {
      const { skillId } = req.body;
      const user = req.user;

      await user.addSkill(skillId);

      res.status(200).send("OK");
    } catch (error) {
      res.status(400).send({ error });
    }
  }

  static async destroySkill(req, res) {
    try {
      const { skillId } = req.body;
      const user = req.user;

      await user.removeSkill(skillId);

      res.status(200).send("OK");
    } catch (error) {
      res.status(400).send({ error });
    }
  }
}

module.exports = { UserController };
