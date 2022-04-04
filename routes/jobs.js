const express = require("express");
const router = express.Router();

router.get("/", (_, res) => {
  res.json([
    {
      id: 1,
      job_title: "Software Developer",
      skills: ["React", "NodeJs", "Sass"],
    },
    {
      id: 2,
      job_title: "QA Engineer",
      skills: ["Testing", "Cypress", "Testcafe", "Jest"],
    },
  ]);
});

router.use("/jobs", router);

module.exports = router;
