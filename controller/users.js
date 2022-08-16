const express = require("express");
const router = express.Router();
const foods = require("../services/users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

router.get("/", async (req, res, next) => {
  try {
    res.json(await foods.getAllUsers());
  } catch (err) {
    console.error(err.message);
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    res.json(await foods.getOneUser(id));
  } catch (err) {
    console.error(err.message);
    next(err);
  }
});

router.post("/register", async (req, res, next) => {
  try {
    const params = req.body;
    if (Object.keys(params).length === 0) {
      res.status(400).json({
        success: false,
        message: "No user data provided",
      });
    } else {
      const { email, firstName } = params;

      const existingUser = await foods.findUserByEmail(email);
      if (existingUser.data.length > 0) {
        res.status(400).json({
          success: false,
          message: "User already exist",
        });
      } else {
        const token = jwt.sign(
          {
            user_name: firstName,
            email,
          },

          process.env.TOKEN_KEY,
          {
            expiresIn: "2h",
          }
        );
        await foods.createUser(params);
        res.status(200).json({
          success: true,
          data: { userName: firstName, email: email },
          token: token,
        });
      }
    }
  } catch (error) {
    console.error(error.message);
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const params = req.body;
    if (Object.keys(params).length === 0) {
      res.status(400).json({
        success: false,
        message: "No user data provided",
      });
    }
    const { email, password } = params;
    const existingUser = await foods.findUserByEmail(email);
    if (existingUser.data.length === 0) {
      res.status(400).json({
        success: false,
        message: "User does not exist. Pls register",
      });
    } else {
      if (await bcrypt.compare(password, existingUser.data[0].password)) {
        const token = jwt.sign(
          {
            userName: existingUser.data[0].firstName,
            email,
          },
          process.env.TOKEN_KEY,
          {
            expiresIn: "2h",
          }
        );
        res.status(200).json({
          success: true,
          data: { email: email },
          token: token,
        });
      } else {
        res.status(401).json({
          success: false,
          data: "Email or Password do not match",
        });
      }
    }
  } catch (err) {
    console.error(err);
  }
});

router.delete("/", async (req, res, next) => {
  try {
    const params = req.body;
    res.json(await foods.deleteUser(params));
  } catch (error) {
    console.error(error.message);
    next(error);
  }
});

router.get("/order", async (req, res, next) => {
  try {
    const params = req.body;
    res.json(await transaction.deleteUser(params));
  } catch (error) {
    console.error(error.message);
    next(error);
  }
});

router.put("/", async (req, res, next) => {
  try {
    const params = req.body;
    res.json(await foods.updateUser(params));
  } catch (error) {
    console.error(error.message);
    next(error);
  }
});
module.exports = router;
