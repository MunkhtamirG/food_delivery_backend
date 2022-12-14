const express = require("express");
const app = express();
require("dotenv").config();
const categoryRouter = require("./controller/categories");
const foodRouter = require("./controller/foods");
const userRouter = require("./controller/users");
const roleRouter = require("./controller/roles");
const PORT = process.env.PORT;
const cors = require("cors");

app.use(
  cors({
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  })
);

app.use(express.json());
app.use("/category", categoryRouter);
app.use("/food", foodRouter);
app.use("/users", userRouter);
app.use("/roles", roleRouter);

app.get("/", (req, res) => {
  res.send("Working");
});

app.listen(PORT, () => {
  console.log("Runnig -> " + PORT);
});
