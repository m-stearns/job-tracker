const express = require("express");
const router = express.Router();

router.get("/current_user", (_, res) => {
  res.json({ name: "J Doe", email: "jdoe@email.com" });
});

router.use("/users", router);

module.exports = router;
