const express = require("express");
const router = express.Router();
const { Assignments, Answers, Lessons } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

//get assignments in a lesson
router.get("/:lesson_id", async (req, res) => {
  const lesson_id = req.params.lesson_id;
  try {
    const assignments = await Assignments.findAll({
      where: { lesson_id },
    });
    res.json(assignments);
  } catch (error) {
    res.status(500).json({ error: "Error fetching lessons with answers." });
  }
});

// Add multiple assignments and their answers
router.post("/", validateToken, async (req, res) => {
  const assignments = req.body; // Expecting an array of assignments

  if (!Array.isArray(assignments) || assignments.length === 0) {
    return res
      .status(400)
      .json({ error: "Assignments array is required and cannot be empty." });
  }

  const transaction = await Assignments.sequelize.transaction();

  try {
    const createdAssignments = [];

    for (const assignment of assignments) {
      const { lesson_id, title, answers } = assignment;

      // Validate input
      if (!lesson_id || !title) {
        throw new Error("Lesson ID and assignment title are required.");
      }

      // Check if the lesson exists
      const lessonExists = await Lessons.findByPk(lesson_id);
      if (!lessonExists) {
        throw new Error(`Lesson with ID ${lesson_id} does not exist.`);
      }

      // Create the assignment
      const newAssignment = await Assignments.create(
        { title, lesson_id },
        { transaction }
      );
      createdAssignments.push(newAssignment);

      // Insert answers if provided
      if (Array.isArray(answers) && answers.length > 0) {
        // Assign unique `answer_id` values per assignment
        const existingAnswers = await Answers.findAll({
          where: { assignment_id: newAssignment.assignment_id },
        });
        const maxAnswerId =
          existingAnswers.length > 0
            ? Math.max(...existingAnswers.map((a) => a.answer_id))
            : 0;

        const answersWithIds = answers.map((answer, index) => ({
          ...answer,
          answer_id: maxAnswerId + index + 1, // Generate sequential `answer_id`
          assignment_id: newAssignment.assignment_id,
        }));

        await Answers.bulkCreate(answersWithIds, { transaction });
      }
    }

    // Commit transaction if everything succeeds
    await transaction.commit();

    res.status(201).json(createdAssignments);
  } catch (error) {
    // Rollback transaction on error
    await transaction.rollback();
    console.error("Error adding assignments and answers:", error.message);
    res.status(500).json({
      error:
        error.message ||
        "An error occurred while adding assignments and answers.",
    });
    console.log(error);
  }
});

module.exports = router;
