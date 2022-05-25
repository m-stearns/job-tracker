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

      const existingSkills = req.body.existingSkills;
      if (existingSkills && existingSkills.length) {
        await Promise.all(
          existingSkills.map((skillId) => {
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

      const newSkills = req.body.newSkills;
      if (newSkills && newSkills.length) {
        const newSkillIds = await Promise.all(
          newSkills.map(async (skillName) => {
            const skill = await Skill.create(
              {
                name: skillName,
                userId: req.user.id,
              },
              { transaction: t }
            );
            return skill.id;
          })
        );
        await Promise.all(
          newSkillIds.map((skillId) => {
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
      console.error(error);
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
          },
        ],
      });

      res.send(jobs);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  static async edit(req, res) {
    const t = await sequelize.transaction();
    try {
      const jobId = req.params.jobId;

      const jobData = {
        title: req.body.jobTitle,
        internship: req.body.isInternship,
        company: req.body.companyName,
        description: req.body.jobDesc,
        link: req.body.jobURL,
        status: req.body.jobStatus,
      };

      await Job.update(jobData, {
        where: {
          id: jobId,
        },
        transaction: t,
      });

      await JobSkills.destroy({
        where: {
          jobId: jobId,
        },
        transaction: t,
      });

      const existingSkills = req.body.existingSkills;
      if (existingSkills && existingSkills.length) {
        await Promise.all(
          existingSkills.map((skillId) => {
            return JobSkills.create(
              {
                jobId: jobId,
                skillId: skillId,
              },
              { transaction: t }
            );
          })
        );
      }

      const newSkills = req.body.newSkills;
      if (newSkills && newSkills.length) {
        const newSkillIds = await Promise.all(
          newSkills.map(async (skillName) => {
            const skill = await Skill.create(
              {
                name: skillName,
                userId: req.user.id,
              },
              { transaction: t }
            );
            return skill.id;
          })
        );
        await Promise.all(
          newSkillIds.map((skillId) => {
            return JobSkills.create(
              {
                jobId: jobId,
                skillId: skillId,
              },
              { transaction: t }
            );
          })
        );
      }

      const contact = req.body.contact;
      if (contact) {
        const contactExists = await Contacts.findOne({
          where: {
            jobId: jobId,
          },
        });

        if (contactExists) {
          await Contacts.update(
            {
              name: contact.name,
              email: contact.email,
              company: contact.company,
              phoneNo: contact.phoneNo,
            },
            {
              where: {
                jobId: jobId,
              },
              transaction: t,
            }
          );
        } else {
          await Contacts.create(
            {
              jobId: jobId,
              name: contact.name,
              email: contact.email,
              company: contact.company,
              phoneNo: contact.phoneNo,
              userId: req.user.id,
            },
            { transaction: t }
          );
        }
      }

      await t.commit();

      res.status(200).send("OK");
    } catch (error) {
      await t.rollback();
      console.error(error);
      res.status(500).send(error);
    }
  }

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
  }
} // end JobController

module.exports = { JobController };
