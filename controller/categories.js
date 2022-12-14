const express = require("express");
const router = express.Router();
const categories = require("../services/categories");
const auth = require("../middleware/auth");

router.get("/", async (req, res, next) => {
  try {
    res.json(await categories.getAllCategories());
  } catch (err) {
    console.error(err.message);
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    res.json(await categories.getOneCategory(id));
  } catch (err) {
    console.error(err.message);
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const params = req.body;
    await categories.createCategory(params);
    res.status(200).json({
      success: true,
      data: params,
    });
  } catch (error) {
    console.error(error.message);
    next(error);
  }
});

router.delete("/", async (req, res, next) => {
  try {
    const params = req.body;
    console.log(params);
    res.json(await categories.deleteCategory(params));
  } catch (error) {
    console.error(error.message);
    next(error);
  }
});

router.put("/", async (req, res, next) => {
  try {
    const params = req.body;
    res.json(await categories.updateCategory(params));
  } catch (error) {
    console.error(error.message);
    next(error);
  }
});
module.exports = router;
