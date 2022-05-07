const express = require("express");
const router = express.Router();
const { Job, Skill, JobSkills } = require("../models");
const requireAuth = require("../middlewares/requireAuth.middleware");

router.get("/", requireAuth, async (req, res) => {
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
            }
          ]
        },
      ],
    });
    
    res.send(jobs);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.use("/jobs", router);

module.exports = router;
