const express = require("express");
const router = express.Router();

const { JobController } = require("../controllers");
const requireAuth = require('../middlewares/requireAuth.middleware')

router.get("/", requireAuth, JobController.findAll);
router.post("/create", requireAuth, JobController.create);

router.use("/jobs", router);

module.exports = router;
