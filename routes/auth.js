const authRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;
const { createUser, getUserByUsername } = require("../db/adapters/users");
const { authRequired } = require("./utils");

// POST /api/auth/register
authRouter.post("/register", async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // Check if username exists already
    const _user = await getUserByUsername(username);
    if (_user) {
      next({
        message: "That user already exists!",
        name: "Auth Error",
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await createUser({ username, password: hashedPassword });
    delete user.password;

    const token = jwt.sign(user, process.env.JWT_SECRET);

    res.cookie("token", token, {
      sameSite: "strict",
      httpOnly: true,
      signed: true,
    });

    res.send(user);
  } catch (error) {
    next(error);
  }
});

authRouter.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // Retrieve the user from the database based on the provided username
    const user = await getUserByUsername(username);

    // Check if the user exists
    if (!user) {
      return res.status(401).send({
        success: false,
        message: "Invalid username or password",
      });
    }

    // Compare the provided password with the hashed password stored in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    // Check if the passwords match
    if (!passwordMatch) {
      return res.status(401).send({
        success: false,
        message: "Invalid username or password",
      });
    }

    // Generate a JWT token for the authenticated user
    const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET);

    // Set the token as a cookie in the response
    res.cookie("token", token, {
      sameSite: "strict",
      httpOnly: true,
      signed: true,
    });

    // Send a success response
    res.send({
      success: true,
      message: "Login successful",
    });
  } catch (error) {
    next(error);
  }
});

authRouter.get("/logout", async (req, res, next) => {
  try {
    res.clearCookie("token", {
      sameSite: "strict",
      httpOnly: true,
      signed: true,
    });
    res.send({
      loggedIn: false,
      message: "Logged Out!",
    });
  } catch (error) {
    next(error);
  }
});

authRouter.get("/me", authRequired, (req, res, next) => {
  res.send(success: true, message: "YOU ARE AUTHORIZED", user: req.user);
});

module.exports = authRouter;