const {userRouter} = require("./users");
const {jobsRouter} = require("./jobs");
const {skillsRouter} = require("./skills");
const {contactsRouter} = require("./contacts"); 
const router = require("express").Router();

router.use("/users", userRouter);
router.use("/skills", skillsRouter);
router.use("/jobs", jobsRouter);
router.use("/contacts", contactsRouter); 
module.exports = router;


