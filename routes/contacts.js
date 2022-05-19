const express = require("express");
const router = express.Router();

const { ContactController } = require("../controllers");
const requireAuth = require("../middlewares/requireAuth.middleware");

router.get("/", requireAuth, ContactController.findAll);
router.post("/create", requireAuth, ContactController.create);
router.get("/:id", requireAuth, ContactController.findById)
router.put("/edit/:id", requireAuth, ContactController.edit); 
router.delete("/:id", requireAuth, ContactController.destroy); 

module.exports = { contactsRouter: router };
