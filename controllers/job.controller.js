const { Job, Skill, JobSkills, Contacts } = require("../models");

class JobController {
  static async create(req, res) {
    try {
      const jobData = {
        title: req.body.jobTitle,
        internship: req.body.isInternship,
        company: req.body.companyName,
        description: req.body.jobDesc,
        link: req.body.jobURL,
        status: req.body.jobStatus,
        userId: req.user.dataValues.id
      };
      // TODO: Doing nothing with contact data
      // TODO: Doing nothing with skills data
      await Job.create(jobData);

      res.status(200).send('OK')
    } catch (error) {
      console.log("error", error)
      res.status(400).send({ error });
    }
  }

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
