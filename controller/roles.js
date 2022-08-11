const express = require("express");
const router = express.Router();
const roles = require("../services/roles");

router.get("/", async (req, res, next) => {
  try {
    res.json(await roles.getAllRoles());
  } catch (err) {
    console.error(err.message);
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    res.json(await roles.getOneRole(id));
  } catch (err) {
    console.error(err.message);
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const params = req.body;
    res.json(await roles.createRole(params));
  } catch (error) {
    console.error(error.message);
    next(error);
  }
});

router.delete("/", async (req, res, next) => {
  try {
    const params = req.body;
    res.json(await roles.deleteRole(params));
  } catch (error) {
    console.error(error.message);
    next(error);
  }
});

router.put("/", async (req, res, next) => {
  try {
    const params = req.body;
    res.json(await roles.updateRole(params));
  } catch (error) {
    console.error(error.message);
    next(error);
  }
});
module.exports = router;
