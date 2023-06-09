const routinesRouter = require("express").Router();
const { authRequired } = require("./utils");
const {
  getAllPublicRoutines,
  getAllRoutinesByUserId,
  getRoutineById,
  createRoutine,
  updateRoutineById,
  deleteRoutineById
} = require("../db/adapters/routines");

routinesRouter.get("/", async (req, res, next) => {
  try {
    const allRoutines = await getAllPublicRoutines();
    res.send({
      success: true,
      message: "All Public Routines Found",
      data: allRoutines
    });
  } catch (error) {
    next(error);
  }
});

routinesRouter.get("/myRoutines", authRequired, async (req, res, next) => {
  try {
    const myRoutines = await getAllRoutinesByUserId(req.user.id);
    res.send({ success: true, message: "My Routines", data: myRoutines });
  } catch (error) {
    next(error);
  }
});

routinesRouter.get("/:id", async (req, res, next) => {
  try {
    const routine = await getRoutineById(req.params.id);
    res.send({ success: true, message: "Routine Found", data: routine });
  } catch (error) {
    next(error);
  }
});

routinesRouter.post("/", authRequired, async (req, res, next) => {
  const { name, goal } = req.body;
  const { id } = req.user;
  try {
    const createdRoutine = await createRoutine({ name, goal, creator_id: id });
    res.send({
      success: true,
      message: "Routine Created",
      data: createdRoutine
    });
  } catch (error) {
    next(error);
  }
});

routinesRouter.patch("/:id", authRequired, async (req, res, next) => {
  try {
    const { id } = req.params;
    const routine = await getRoutineById(id);
    if (routine.creator_id !== req.user.id) {
      next({
        message: "You are not able to edit this routine!"
      });
      return;
    }
    const updatedRoutine = await updateRoutineById(id, req.body);
    res.send({
      success: true,
      message: "Routine Updated",
      data: updatedRoutine
    });
  } catch (error) {
    next(error);
  }
});

routinesRouter.delete("/:id", authRequired, async (req, res, next) => {
  try {
    const { id } = req.params;
    const routine = await getRoutineById(id);
    if (routine.creator_id !== req.user.id) {
      next({
        message: "You are not able to delete this routine!"
      });
      return;
    }
    const deletedRoutine = await deleteRoutineById(id);
    res.send({
      success: true,
      message: "Routine Deleted",
      data: deletedRoutine
    });
  } catch (error) {
    next(error);
  }
});

module.exports = routinesRouter;