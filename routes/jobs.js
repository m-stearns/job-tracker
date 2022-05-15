const express = require("express");
const router = express.Router();

const { JobController } = require("../controllers");
const requireAuth = require("../middlewares/requireAuth.middleware");

router.get("/", requireAuth, JobController.findAll);
router.post("/", requireAuth, JobController.create);

module.exports = { jobsRouter: router };
