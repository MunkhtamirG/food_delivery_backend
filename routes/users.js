const express = require("express");
const router = express.Router();
const foods = require("../services/users");

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

router.post("/", async (req, res, next) => {
  try {
    const params = req.body;
    res.json(await foods.createUser(params));
  } catch (error) {
    console.error(error.message);
    next(error);
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
