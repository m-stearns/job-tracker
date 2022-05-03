const { Job } = require("../models");

class JobController {
  static async create(req, res) {
    try {
      console.log("BODY: \n\n", req.body)
      console.log("\n\nUSER: \n\n", req.user)
      const jobData = {
        title: req.body.jobTitle,
        internship: req.body.internship,
        company: req.body.companyName,
        description: req.body.jobDesc,
        link: req.body.jobURL,
        status: req.body.jobStatus,
        userId: req.user.dataValues.id
      };
      // TODO: Doing nothing with contact data
      // TODO: Doing nothing with skills data
      console.log({ jobData });
      const job = await Job.create(
        jobData,
        
      );

      console.log('\n\n\n', job);

      res.json(job);
    } catch (error) {
      console.log("error", error)
      res.status(400).send({ error });
    }
  }

}

module.exports = { JobController };
