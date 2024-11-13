const express = require("express");
const router = express.Router();
const { Students } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/", async (req, res) => {
  const listOfStudents = await Students.findAll();
  res.json(listOfStudents);
});

router.get("/:classId", async (req, res) => {
  const classId = req.params.classId;
  try {
    const students = await Students.findAll({ where: { ClassId: classId } });
    if (classId) {
      res.json(students);
    } else {
      res.status(404).json({ error: "Students not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching the students" });
  }
});

router.post("/", validateToken, async (req, res) => {
  const addedClass = req.body;
  await Students.create(addedClass);
  res.json(addedClass);
});

module.exports = router;
