const express = require("express");
const router = express.Router();

const { ContactController } = require("../controllers");
const requireAuth = require("../middlewares/requireAuth.middleware");

router.get("/", requireAuth, ContactController.findAll);
router.post("/create", requireAuth, ContactController.create);
router.get("/current_contact", requireAuth, ContactController.currentContact)


module.exports = { contactsRouter: router };
