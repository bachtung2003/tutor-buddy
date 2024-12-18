const express = require("express");
const router = express.Router();
const { Assignments, Answers, Lessons } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

// Get all assignments
router.get("/", validateToken, async (req, res) => {
  try {
    const listOfAssignments = await Assignments.findAll();
    res.json(listOfAssignments);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching classes" });
  }
});

// Get assignments in a lesson, including answers for each assignment
router.get("/:lesson_id", validateToken, async (req, res) => {
  const lesson_id = req.params.lesson_id;
  try {
    // Fetch assignments for the given lesson
    const assignments = await Assignments.findAll({
      where: { lesson_id },
      include: [
        {
          model: Answers,
          as: "answers", // Assuming you have an alias 'answers' set in your model associations
          attributes: ["text", "isCorrect"], // Only include 'text' and 'isCorrect' fields from Answers
        },
      ],
    });

    // Structure the data in the desired format
    const result = assignments.map((assignment) => ({
      assignment_id: assignment.assignment_id,
      title: assignment.title,
      answers: assignment.answers.map((answer) => ({
        text: answer.text,
        isCorrect: answer.isCorrect,
      })),
    }));

    // Send the structured response
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Error fetching assignments with answers." });
  }
});

router.put("/:lesson_id", validateToken, async (req, res) => {
  const lesson_id = req.params.lesson_id;
  const assignmentsToUpdate = req.body; // Expecting an array of assignments

  if (!Array.isArray(assignmentsToUpdate) || assignmentsToUpdate.length === 0) {
    return res
      .status(400)
      .json({ error: "Assignments array is required and cannot be empty." });
  }

  const transaction = await Assignments.sequelize.transaction();

  try {
    for (const assignmentData of assignmentsToUpdate) {
      const { assignment_id, title, answers } = assignmentData;

      // Validate input
      if (!assignment_id || !title || !Array.isArray(answers)) {
        throw new Error(
          "Assignment ID, title, and a valid answers array are required."
        );
      }

      // Check if the assignment belongs to the lesson
      const assignment = await Assignments.findOne({
        where: { assignment_id, lesson_id },
        transaction,
      });

      if (!assignment) {
        // Create a new assignment if it doesn't exist
        const newAssignment = await Assignments.create(
          { assignment_id, title, lesson_id },
          { transaction }
        );

        // Add the answers for the new assignment
        const newAnswers = answers.map((answer, index) => ({
          ...answer,
          answer_id: index + 1, // Generate sequential answer IDs
          assignment_id: newAssignment.assignment_id,
        }));

        await Answers.bulkCreate(newAnswers, { transaction });

        continue; // Skip the rest of the update logic for this iteration
      }

      // Update the assignment title
      await assignment.update({ title }, { transaction });

      // Replace answers: Delete old ones and insert new ones
      await Answers.destroy({
        where: { assignment_id },
        transaction,
      });

      const updatedAnswers = answers.map((answer, index) => ({
        ...answer,
        answer_id: index + 1, // Generate sequential answer IDs
        assignment_id,
      }));

      await Answers.bulkCreate(updatedAnswers, { transaction });
    }

    // Commit the transaction
    await transaction.commit();
    res.status(200).json({ message: "Assignments updated successfully." });
  } catch (error) {
    // Rollback on error
    await transaction.rollback();
    console.error("Error updating assignments:", error.message);
    res.status(500).json({
      error: error.message || "An error occurred while updating assignments.",
    });
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

// Delete an assignment by lesson_id and assignment_id
router.delete("/:lesson_id/:assignment_id", validateToken, async (req, res) => {
  const lesson_id = req.params.lesson_id;
  const assignment_id = req.params.assignment_id; // Expecting assignment_id in the request body

  if (!assignment_id) {
    return res.status(400).json({ error: "Assignment ID is required." });
  }

  const transaction = await Assignments.sequelize.transaction();

  try {
    // Check if the assignment exists for the given lesson
    const assignment = await Assignments.findOne({
      where: { lesson_id, assignment_id },
      transaction,
    });

    if (!assignment) {
      return res.json(
        `Assignment with ID ${assignment_id} not found in lesson ${lesson_id}.`
      );
    }

    // Delete all answers associated with the assignment
    await Answers.destroy({
      where: { assignment_id },
      transaction,
    });

    // Delete the assignment
    await Assignments.destroy({
      where: { assignment_id, lesson_id },
      transaction,
    });

    // Commit transaction
    await transaction.commit();
    res.status(200).json({
      message: `Assignment with ID ${assignment_id} deleted successfully.`,
    });
  } catch (error) {
    // Rollback transaction on error
    await transaction.rollback();
    console.error("Error deleting assignment:", error.message);
    res.status(500).json({
      error:
        error.message || "An error occurred while deleting the assignment.",
    });
  }
});

module.exports = router;
