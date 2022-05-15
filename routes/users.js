const express = require("express");
const router = express.Router();

const { UserController } = require("../controllers");
const requireAuth = require("../middlewares/requireAuth.middleware");

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/current_user", UserController.currentUser);
router.post("/skills", requireAuth, UserController.addSkill);
router.delete("/skills", requireAuth, UserController.destroySkill);

module.exports = { userRouter: router };
