const express = require("express");
const router = express.Router();

const { UserController } = require("../controllers");

router.post("/new", UserController.create);

router.get("/current_user", (_, res) => {
  res.json({ name: "J Doe", email: "jdoe@email.com" });
});

router.use("/users", router);

module.exports = router;
