const express = require("express");
const router = express.Router();

const { UserController } = require("../controllers");
const requireAuth = require('../middlewares/requireAuth.middleware')

router.post("/new", UserController.create);
router.get("/current_user", UserController.currentUser);
router.get("/protected", requireAuth, UserController.protectedResource);

router.use("/users", router);

module.exports = router;
