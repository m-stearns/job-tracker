const { Skill } = require("../models");

class SkillController {
  static async create(req, res) {
    try {
      const skillData = {
        name: req.body.skillName,
        userId: req.user.id,
      };
      const newSkill = await Skill.create(skillData);
      res.send(newSkill);
    } catch (error) {
      res.status(400).send({ error });
    }
  }

  static async findAllForUser(req, res) {
    try {
      const user = req.user;
      const skills = await Skill.findAll({
        where: {
          userId: user.id,
        },
      });
      res.send(skills);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  static destroy(req, res) {
    try {
      const skillId = req.params.id;
      const user = req.user;
      const skill = Skill.findOne({
        where: {
          id: skillId,
          userId: user.id,
        },
      });
      if (!skill) {
        res.status(404).send("Skill not found");
      }
      skill.destroy();
      res.status(200).send("Skill deleted");
    } catch (error) {
      res.status(500).send(error);
    }
  }
}

module.exports = { SkillController };