const express = require("express");
const router = express.Router();
const foods = require("../services/foods");

router.get("/", async (req, res, next) => {
  try {
    res.json(await foods.getAllFoods());
  } catch (err) {
    console.error(err.message);
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    res.json(await foods.getOneFood(id));
  } catch (err) {
    console.error(err.message);
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const params = req.body;
    res.json(await foods.createFoods(params));
  } catch (error) {
    console.error(error.message);
    next(error);
  }
});

router.delete("/", async (req, res, next) => {
  try {
    const params = req.body;
    res.json(await foods.deleteFoods(params));
  } catch (error) {
    console.error(error.message);
    next(error);
  }
});

router.put("/", async (req, res, next) => {
  try {
    const params = req.body;
    res.json(await foods.updateFoods(params));
  } catch (error) {
    console.error(error.message);
    next(error);
  }
});
module.exports = router;
