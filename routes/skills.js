const express = require("express");
const router = express.Router();

const { SkillController } = require("../controllers");
const requireAuth = require("../middlewares/requireAuth.middleware");

router.get("/", requireAuth, SkillController.findAllForUser);
router.post("/", requireAuth, SkillController.create);
router.delete("/:id", requireAuth, SkillController.destroy);
router.put("/:id", requireAuth, SkillController.update);

module.exports = { skillsRouter: router };
