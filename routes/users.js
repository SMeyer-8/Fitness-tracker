const usersRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const {
  getAllUsers,
  getUserByUsername,
  createUser,
} = require("../db/adapters/users");

//POST request to /api/users/register
// usersRouter.post("/login", async (req, res, next) => {
//   //login code goes here
// })

usersRouter.post("/register", async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const _user = await getUserByUsername(username);
    if (_user) {
      next({
        name: "ALREADY A USER",
        message: "Registration unsuccessful",
      });
      return
    }
    const user = await createUser({username, password})
    delete user.password
    res.send({
      message: "You are registered!!",
      user
    })
  } catch (error) {
    next(error)
  }
})

// usersRouter.get("/me", async (req, res, next) => {

//     })


// POST / users/login
// const user = await createUser(username, password);
// const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
//   expiresIn: "2w",
// });
// res.send({
//   message: "The username already exists",
// });
//   } catch (error) {
//   next(error);
// }
// });

usersRouter.get("/", async (req, res, next) => {
  try {
    const users = await getAllUsers();
    res.send(users);
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;
