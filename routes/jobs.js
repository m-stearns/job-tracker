const express = require("express");
const router = express.Router();
const { JobController } = require("../controllers/job.controller");
const requireAuth = require("../middlewares/requireAuth.middleware");

router.get("/", requireAuth, JobController.findAll);

router.use("/jobs", router);

module.exports = router;
