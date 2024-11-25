const express = require("express");
const router = express.Router();
const { Courses } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

// Get all classes for the authenticated user
router.get("/", validateToken, async (req, res) => {
  try {
    // Assuming the Classes model has a field 'userId' that links to the user
    const teacherId = req.user.id; // Access the user ID from the token
    const listOfCourses = await Courses.findAll({
      where: { teacher_id: teacherId },
    });
    res.json(listOfCourses);
  } catch (error) {
    console.log(error);
    console.log(req.user);
    res.status(500).json({ error: "An error occurred while fetching course" });
  }
});

// Get a course by ID
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const courseDetails = await Courses.findByPk(id);
    if (courseDetails) {
      res.json(courseDetails);
    } else {
      res.status(404).json({ error: "Course not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching the course details" });
  }
});

// Add a new course
router.post("/", async (req, res) => {
  const addedCourse = req.body;
  try {
    await Courses.create(addedCourse);
    res.json(addedCourse);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while adding the course" });
  }
});

module.exports = router;
