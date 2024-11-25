const express = require("express");
const router = express.Router();
const { Lessons } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

//get lesson in a course
router.get("/:course_id", async (req, res) => {
  const id = req.params.id;
  try {
    const courseDetails = await Lessons.findByPk(id);
    if (courseDetails) {
      res.json(courseDetails);
    } else {
      res.json("lesson not found");
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching the lesson details" });
  }
});

// Add a new chapter to a course
router.post("/", validateToken, async (req, res) => {
  const { course_id, title, description } = req.body;

  if (!course_id || !title) {
    return res.status(400).json({ error: "Course ID and title are required." });
  }

  try {
    const newLesson = await Lessons.create({
      course_id,
      title,
      description,
    });
    res.status(201).json(newLesson);
  } catch (error) {
    console.error("Error adding chapter:", error);
    res
      .status(500)
      .json({ error: "An error occurred while adding the chapter." });
  }
});

// Update a chapter by ID
router.put("/:id", validateToken, async (req, res) => {
  const lessonId = req.params.id;
  const { title, description } = req.body;

  try {
    const lesson = await Lessons.findByPk(lessonId);

    if (!lesson) {
      return res.status(404).json({ error: "Chapter not found." });
    }

    await lesson.update({ title, description });
    res.status(200).json({ message: "Chapter updated successfully.", lesson });
  } catch (error) {
    console.error("Error updating chapter:", error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the chapter." });
  }
});

// Delete a chapter by ID
router.delete("/:id", validateToken, async (req, res) => {
  const lessonId = req.params.id;

  try {
    const lesson = await Lessons.findByPk(lessonId);

    if (!lesson) {
      return res.status(404).json({ error: "Chapter not found." });
    }

    await lesson.destroy();
    res.status(200).json({ message: "Chapter deleted successfully." });
  } catch (error) {
    console.error("Error deleting chapter:", error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the chapter." });
  }
});

module.exports = router;
