const { Job } = require("../models");

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

  static async fetchByUserId(req, res) {
    try {
      const id = req.user.dataValues.id
      const jobs = await Job.findAll({where: {userId: id}});
      res.status(200).json(jobs);

    } catch (error) {
      console.log("error: ", error)
      res.status(400).send({ error })
    }
  }

}

module.exports = { JobController };
