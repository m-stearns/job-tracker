const { Job, Skill, JobSkills, Contacts } = require("../models");

class JobController {
  static async findAll(req, res) {
    try {
      const user = req.user;

      const jobs = await Job.findAll({
        where: {
          userId: user.id,
        },
        include: [
          {
            model: JobSkills,
            as: "skills",
            include: [
              {
                model: Skill,
                as: "skill",
              },
            ],
          },
          {
            model: Contacts,
            as: "contacts",
          }
        ],
      });

      res.send(jobs);
    } catch (error) {
      res.status(500).send(error);
    }
  }
}

module.exports = { JobController };
