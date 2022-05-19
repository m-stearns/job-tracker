const { User, UserSkills, JobSkills, Job } = require("../models");

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
      const { skillId, comfortLevel } = req.body;
      const user = req.user;

      await UserSkills.create({
        userId: user.id,
        skillId,
        comfortLevel: comfortLevel > 0 && comfortLevel <= 5 ? comfortLevel : 0,
      });

      res.status(200).send("OK");
    } catch (error) {
      res.status(400).send({ error });
    }
  }

  static async skillStats(req, res) {
    try {
      const user = req.user;

      const userJobsCount = await Job.count({
        where: {
          userId: user.id,
        },
      });

      const userSkillsStats = await Promise.all(
        user.skills.map(async (userSkill) => {
          const skillJobSkillsCount = await JobSkills.count({
            where: {
              skillId: userSkill.skillId,
            },
          });

          return {
            id: userSkill.skillId,
            name: userSkill.skill.name,
            comfortLevel: userSkill.comfortLevel,
            count: skillJobSkillsCount,
            appearsInPercentageOfJobs: Math.round(
              (skillJobSkillsCount / userJobsCount) * 100
            ),
          };
        })
      );

      res.json({
        userSkillsStats,
      });
    } catch (error) {
      console.error(error);
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
