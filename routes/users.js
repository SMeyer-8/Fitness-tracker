const userRouter = require('express').Router();
const bcrypt = require("bcrypt");
const { authRequired } = require("./utils");
const SALT_ROUNDS = 10;
const { createUser, getUserByUsername } = require("../db/adapters/users");

//signup
userRouter.post("/register", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = bcrypt.hash(password, SALT_ROUNDS);
    const user = await createUser({ username, password: hashedPassword });
    delete user.password;

    const token = jwt.sign(user, process.env.JWT_SECRET);
    console.log("token:", token);

    res.cookie("token", token, {
      sameSite: "strict",
      httpOnly: true,
      signed: true,
    });

    res.send({ user, token });
  } catch (error) {
    next(error);
  }
});

userRouter.post("/login", async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await getUserByUsername(username);
    const checkedPassword = await bcrypt.compare(password, user.password);
    if (checkedPassword) {
      const token = jwt.sign(user, process.env.JWT_SECRET);

      res.cookie("token", token, {
        sameSite: "strict",
        httpOnly: true,
        signed: true,
      });
      res.send({ message: "You're logged in!" });
    }
  } catch (error) {
    next({
      name: "Login FAiled",
      message: "Invalid username or password",
    });
  }
});

userRouter.get("/logout", async (req, res, next) => {
  try {
    res.clearCookie("token", {
      sameSite: "strict",
      httpOnly: true,
      signed: true,
    });
    res.send({
      loggedIn: false,
      message: "You're logged out!",
    });
  } catch (error) {
    next(error);
  }
});

userRouter.get("/me", authRequired, (req, res, next) => {
  res.send(req.user);

});
  

module.exports = userRouter;