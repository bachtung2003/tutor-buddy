const express = require("express");
const router = express.Router();
const { Scores } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

//get all scores
router.get("/all", validateToken, async (req, res) => {
  try {
    const studentId = req.user.id; // Access the user ID from the token
    const listOfScores = await Scores.findAll({
      where: {
        student_id: studentId,
      },
    });
    res.json(listOfScores);
  } catch (error) {
    console.log(error);
    console.log(req.user);
    res.status(500).json({ error: "An error occurred while fetching scores" });
  }
});

//get course scores
router.get("/", validateToken, async (req, res) => {
  try {
    const studentId = req.user.id; // Access the user ID from the token
    const { course_id } = req.body;
    const courseScoresArray = await Scores.findAll({
      where: {
        student_id: studentId,
        course_id: course_id,
      },
    });
    res.json(courseScoresArray);
  } catch (error) {
    console.log(error);
    console.log(req.user);
    res.status(500).json({ error: "An error occurred while fetching scores" });
  }
});

//get single lesson score
router.get("/lesson", validateToken, async (req, res) => {
  try {
    const studentId = req.user.id; // Access the user ID from the token
    const { course_id, assignment_id } = req.body;
    const lessonScore = await Scores.findOne({
      where: {
        student_id: studentId,
        course_id: course_id,
        assignment_id: assignment_id,
      },
    });
    res.json(lessonScore);
  } catch (error) {
    console.log(error);
    console.log(req.user);
    res.status(500).json({ error: "An error occurred while fetching scores" });
  }
});

//set lesson score
router.post("/", validateToken, async (req, res) => {
  try {
    const studentId = req.user.id; // Access the user ID from the token
    const { course_id, lesson_id, score } = req.body;

    // Check if a score for this student, course, and lesson already exists
    const existingScore = await Scores.findOne({
      where: {
        student_id: studentId,
        course_id: course_id,
        lesson_id: lesson_id,
      },
    });

    if (existingScore) {
      // If the previous score is greater or equal, reject the new score
      if (existingScore.score >= score) {
        return res.status(400).json({
          message: "The new score is less than or equal to the previous score.",
        });
      }

      // Update the existing score if the new score is higher
      existingScore.score = score;
      await existingScore.save(); // Save the updated score to the database
      return res.json({
        message: "Score updated successfully.",
        updatedScore: existingScore,
      });
    }

    // Create a new score if none exists
    const newScore = await Scores.create({
      student_id: studentId,
      course_id,
      lesson_id,
      score,
    });
    return res.status(201).json({
      message: "Score added successfully.",
      newScore,
    });
  } catch (error) {
    console.error("Error adding score:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while adding the score." });
  }
});

module.exports = router;
