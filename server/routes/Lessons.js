const express = require("express");
const router = express.Router();
const { Lessons } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

//get lesson in a course
router.get("/:course_id", async (req, res) => {
  const course_id = req.params.course_id;
  try {
    const lessons = await Lessons.findAll({
      where: { course_id },
      // include: {
      //   model: Assignments,
      //   include: [Answers],
      // },
    });
    res.json(lessons);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error fetching lessons with answers." });
  }
});

router.post("/", validateToken, async (req, res) => {
  const { course_id, title, description, lesson_url, duration } = req.body;

  if (!course_id || !title) {
    return res.status(400).json({ error: "Course ID and title are required." });
  }

  try {
    const newLesson = await Lessons.create({
      course_id,
      title,
      description,
      lesson_url,
      duration,
    });
    res.status(201).json({ lesson_id: newLesson.lesson_id });
  } catch (error) {
    console.error("Error adding lesson:", error);
    res
      .status(500)
      .json({ error: "An error occurred while adding the lesson." });
  }
});

// Update a chapter by ID
router.put("/:id", validateToken, async (req, res) => {
  const lessonId = req.params.id;
  const { title, description } = req.body;

  try {
    const lesson = await Lessons.findByPk(lessonId);

    if (!lesson) {
      return res.status(404).json({ error: "Lesson not found." });
    }

    await lesson.update({ title, description });
    res.status(200).json({ message: "Lesson updated successfully.", lesson });
  } catch (error) {
    console.error("Error updating lesson:", error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the lesson." });
  }
});

// Delete a chapter by ID
router.delete("/:id", validateToken, async (req, res) => {
  const lessonId = req.params.id;

  try {
    const lesson = await Lessons.findByPk(lessonId);

    if (!lesson) {
      return res.status(404).json({ error: "Lesson not found." });
    }

    await lesson.destroy();
    res.status(200).json({ message: "Chapter deleted successfully." });
  } catch (error) {
    console.error("Error deleting lesson:", error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the lesson." });
  }
});

// Get single lesson by lesson_id
router.get("/getlesson/:lesson_id", validateToken, async (req, res) => {
  const lessonId = req.params.lesson_id;
  try {
    const lesson = await Lessons.findByPk(lessonId);

    if (!lesson) {
      return res.status(404).json({ error: "Lesson not found." });
    }
    res.json(lesson);
  } catch (error) {
    console.error("Error searching for lesson:", error);
    res
      .status(500)
      .json({ error: "An error occurred while searching for the lesson." });
  }
});

module.exports = router;
