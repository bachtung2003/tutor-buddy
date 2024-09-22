const express = require("express");
const app = express();
const port = 8080;
const cors = require("cors");

app.use(express.json());
app.use(cors());

const db = require("./models");

// Routers
const classesRouter = require("./routes/Classes");
app.use("/classupdate", classesRouter);
const studentsRouter = require("./routes/Students");
app.use("/studentupdate", studentsRouter);
const usersRouter = require("./routes/Users");
app.use("/auth", usersRouter);

db.sequelize.sync().then(() => {
  app.listen(port, (error) => {
    if (!error) {
      console.log("Server Running on Port " + port);
    } else {
      console.log("Error " + error);
    }
  });
});
