const express = require("express");
const router = express.Router();

const { ContactController } = require("../controllers");
const requireAuth = require("../middlewares/requireAuth.middleware");

router.get("/", requireAuth, ContactController.findAll);
router.post("/create", requireAuth, ContactController.create);

router.use("/contacts", router);

module.exports = router;
