const usersRouter = require("express").Router();
const { getAllUsers } = require("../db/adapters/users");

//GET request to /api/users/
usersRouter.get("/", async (req, res, next) => {
  try {
    const users = await getAllUsers();
    res.send(users);
  } catch (error) {
    next(error);
  }
  res.send("USERS COMING SOON TO A PLACE NEAR YOU!");
});

module.exports = usersRouter;
