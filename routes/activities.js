const activityRouter = require("express").Router();
const { authRequired } = require("./utils");
const { updateActivity, getAllActivities, getActivityById, createActivity } = require('../db/adapters/activities');
const { getPublicRoutinesByActivity } = require('../db/adapters/routines');


activityRouter.get("/", async (req, res, next) => {
    try {
      const allActivities = await getAllActivities();
      res.send({
        success: true,
        message: "All Public Activities Found",
        data: allActivities
      });
    } catch (error) {
      next(error);
    }
});

activityRouter.post("/", authRequired, async (req, res, next) => {
    const { name, description } = req.body;
    try {
      const createdActivity = await createActivity({ name, description });
      res.send({
        success: true,
        message: "Activity Created",
        data: createdActivity
      });
    } catch (error) {
      next(error);
    }
});

activityRouter.patch("/:id", authRequired, async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name, description } = req.body;
      const updatedActivity= await updateActivity(id, name, description);
      res.send({
        success: true,
        message: "Activity Updated",
        data: updatedActivity
      });
    } catch (error) {
      next(error);
    }
});

activityRouter.get("/:activityId/routines", async (req, res, next) => {
    try {
      const { activityId } = req.params;
      const routines = await getPublicRoutinesByActivity(activityId);
      res.send({
        success: true,
        message: "All Public Routines Found",
        data: routines
      });
    } catch (error) {
      next(error);
    }
});

module.exports = activityRouter;