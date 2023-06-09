const routineActivityRouter = require("express").Router();
const { authRequired } = require("./utils");
const { addActivityToRoutine, updateRoutineActivity, destroyRoutineActivity } = require('../db/adapters/routine_activities');

routineActivityRouter.post("/", authRequired, async (req, res, next) => {
    const { routineId, activityId, duration, count } = req.body;
    try {
      const routineActivity = await addActivityToRoutine({ routineId, activityId, duration, count });
      res.send({
        success: true,
        message: "Routine Activity Created",
        data: routineActivity
      });
    } catch (error) {
      next(error);
    }
});

routineActivityRouter.patch("/:id", authRequired, async (req, res, next) => {
    try {
      const { id } = req.params;
      const { count, duration } = req.body;
      const updatedActivity= await updateRoutineActivity(id, count, duration);
      res.send({
        success: true,
        message: "Activity Updated",
        data: updatedActivity
      });
    } catch (error) {
      next(error);
    }
});

routineActivityRouter.delete("/:id", authRequired, async (req, res, next) => {
    try {
      const { id } = req.params;
      await destroyRoutineActivity(id);
      res.send({
        success: true,
        message: "Routine Activity Deleted",
      });
    } catch (error) {
      next(error);
    }
});

module.exports = routineActivityRouter;