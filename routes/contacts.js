const express = require("express");
const router = express.Router();

const { ContactController } = require("../controllers");
const requireAuth = require("../middlewares/requireAuth.middleware");

router.get("/", requireAuth, ContactController.findAll);
router.post("/create", requireAuth, ContactController.create);
router.get("/current_contact", requireAuth, ContactController.currentContact)

<<<<<<< HEAD

module.exports = { contactsRouter: router };
=======
router.use("/contacts", router);

module.exports = router;
>>>>>>> bd95daa9c1abdf2b59e95c5b955fbcf722fb9f89
