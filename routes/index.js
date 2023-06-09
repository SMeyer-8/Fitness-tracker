const router = require("express").Router();

router.get("/health", (req, res, next) => {
  try {
    res.send("API is Healthy 😎!");
  } catch (error) {
    next(error);
  }
});

// Hook up other Routers ex: router.use('/users', require('./users'))
router.use("/users", require("./users"));
router.use("/auth", require("./auth"));
router.use("/routines", require("./routines"));
router.use("/activities", require("./activities"));
router.use("/routine_activities", require("./routine_activities"));

module.exports = router;