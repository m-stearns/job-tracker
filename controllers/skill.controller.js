const { Skill, UserSkills, sequelize } = require("../models");

class SkillController {
  static async create(req, res) {
    const t = await sequelize.transaction();
    try {
      const existingSkill = req.body.existingSkill;
      const newSkill = req.body.newSkill;
      const user = req.user;

      if (existingSkill) {
        const skill = await Skill.findOne({
          where: {
            id: existingSkill,
            userId: user.id,
          },
        });

        if (!skill) {
          return res.status(400).send({ error: "Skill does not exist" });
        }

        await UserSkills.create(
          {
            userId: user.id,
            skillId: existingSkill,
            comfortLevel: req.body.comfortLevel,
          },
          { transaction: t }
        );
      } else if (newSkill) {
        const skill = await Skill.create(
          {
            name: newSkill,
            userId: user.id,
          },
          { transaction: t }
        );
        await UserSkills.create(
          {
            userId: user.id,
            skillId: skill.id,
            comfortLevel: req.body.comfortLevel,
          },
          { transaction: t }
        );
      }

      await t.commit();
      res.status(200).send("Skill added");
    } catch (error) {
      await t.rollback();
      console.error(error);
      res.status(500).send({ error });
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

  static async update(req, res) {
    try {
      const user = req.user;
      const userSkill = await UserSkills.findOne({
        where: {
          userId: user.id,
          skillId: req.params.id,
        },
      });

      if (!userSkill) {
        return res.status(400).send({ error: "Skill does not exist" });
      }

      await userSkill.update({
        comfortLevel: req.body.comfortLevel,
      });
      res.send("Skill updated");
    } catch (error) {
      res.status(500).send(error);
    }
  }

  static destroy(req, res) {
    try {
      const skillId = req.params.id;
      const user = req.user;
      const skill = Skill.destroy({
        where: {
          id: skillId,
          userId: user.id,
        },
      });

      res.status(200).send("Skill deleted");
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  }
}

module.exports = { SkillController };
