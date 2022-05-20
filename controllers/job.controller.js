const { Job, Skill, JobSkills, Contacts, sequelize } = require("../models");

class JobController {
  static async create(req, res) {
    const t = await sequelize.transaction();

    try {
      const jobData = {
        title: req.body.jobTitle,
        internship: req.body.isInternship,
        company: req.body.companyName,
        description: req.body.jobDesc,
        link: req.body.jobURL,
        status: req.body.jobStatus,
        userId: req.user.id,
      };

      const job = await Job.create(jobData, { transaction: t });

      const skills = req.body.skills;
      if (skills && skills.length) {
        await Promise.all(
          skills.map((skillId) => {
            return JobSkills.create(
              {
                jobId: job.id,
                skillId: skillId,
              },
              { transaction: t }
            );
          })
        );
      }

      const contact = req.body.contact;
      if (contact) {
        await Contacts.create(
          {
            jobId: job.id,
            name: contact.name,
            email: contact.email,
            company: contact.company,
            phoneNo: contact.phoneNo,
            userId: req.user.id,
          },
          { transaction: t }
        );
      }

      await t.commit();

      res.status(200).send("OK");
    } catch (error) {
      await t.rollback();

      res.status(400).send({ error });
    }
  };

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
          },
        ],
      });

      res.send(jobs);
    } catch (error) {
      res.status(500).send(error);
    }
  };

  static async edit(req, res) {
    try {
      const jobId = req.params.jobId;

      await Job.update(
        {
          title: req.body.jobTitle,
          internship: req.body.isInternship,
          company: req.body.companyName,
          description: req.body.jobDesc,
          link: req.body.jobURL,
          status: req.body.jobStatus,
        },
        {
          where: {
            id: jobId
          }
        }
      )
      // TODO: Doing nothing with contact data
      // TODO: Doing nothing with skills data
      res.status(200).send('OK')
    } catch (error) {
      res.status(500).send(error);
    }
  };

  static async find(req, res) {
    try {
      const jobId = req.params.jobId;

      const job = await Job.findByPk(jobId, {
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
          },
        ],
      });

      res.send(job);
    } catch (error) {
      res.status(500).send(error);
    }
  };

} // end JobController

module.exports = { JobController };
