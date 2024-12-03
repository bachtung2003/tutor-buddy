const express = require("express");
const router = express.Router();
const { Student_Courses, Courses } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

// Get all courses for the authenticated user
router.get("/", validateToken, async (req, res) => {
  try {
    const studentId = req.user.id; // Extract student ID from the authenticated user token

    // Step 1: Get all course IDs registered by the student
    const registeredCourses = await Student_Courses.findAll({
      where: { student_id: studentId },
      attributes: ["course_id"], // Only fetch the course_id
    });

    // Extract course IDs into an array
    const courseIds = registeredCourses.map((course) => course.course_id);

    if (courseIds.length === 0) {
      return res.json([]); // If no courses are registered, return an empty array
    }

    // Step 2: Fetch course details from the Courses table
    const courses = await Courses.findAll({
      where: { course_id: courseIds },
    });

    res.json(courses); // Send the array of courses to the client
  } catch (error) {
    console.error("Error fetching registered courses:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching registered courses" });
  }
});

// Get all courses for the authenticated user
router.get("/get-all", validateToken, async (req, res) => {
  try {
    const studentId = req.user.id; // Extract student ID from the authenticated user token

    // Step 1: Get all course IDs registered by the student
    const registeredCourses = await Student_Courses.findAll({
      where: { student_id: studentId },
    });
    res.json(registeredCourses); // Send the array of courses to the client
  } catch (error) {
    console.error("Error fetching registered courses:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching registered courses" });
  }
});

// Get a course by ID
router.get("/:course_id", validateToken, async (req, res) => {
  const id = req.params.course_id;
  try {
    const courseDetails = await Student_Courses.findByPk(id);
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
router.post("/", validateToken, async (req, res) => {
  const addedCourse = req.body;
  const { course_id } = addedCourse; // Assuming course_id is provided in the request body

  try {
    // Check if the student has already registered for the course
    const existingCourse = await Student_Courses.findOne({
      where: {
        course_id: course_id,
        student_id: req.user.id, // Use the authenticated student's ID
      },
    });

    if (existingCourse) {
      return res.json({ error: "Course already registered" });
    }

    // If not already registered, create the course registration
    await Student_Courses.create(addedCourse);
    res.json(addedCourse);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while adding the course" });
  }
});

// Delete a course by ID
router.delete("/:course_id", validateToken, async (req, res) => {
  const courseId = req.params.course_id;
  try {
    // Check if the course exists
    const course = await Student_Courses.findOne({
      where: {
        course_id: courseId,
        student_id: req.user.id, // Use the authenticated student's ID
      },
    });

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    // Delete the course itself
    await course.destroy();

    res.json({ message: "Course and its related data deleted successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the course" });
  }
});

// Get top 3 courses based on created time
router.get("/sorted/top-3", validateToken, async (req, res) => {
  const userId = req.user.id;
  try {
    // Fetch the top 3 courses for the authenticated user, ordered by createdAt descending
    // Assuming the user ID is available from the token
    const topCourses = await Student_Courses.findAll({
      where: { teacher_id: userId },
      order: [["createdAt", "DESC"]],
      limit: 3,
    });
    res.json(topCourses);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching top courses" });
  }
});

// Get all courses for student to sign-up
router.get("/unregistered/all-courses", validateToken, async (req, res) => {
  try {
    // Assuming the Classes model has a field 'userId' that links to the user
    const listOfCourses = await Student_Courses.findAll();
    res.json(listOfCourses);
  } catch (error) {
    console.log(error);
    console.log(req.user);
    res.status(500).json({ error: "An error occurred while fetching course" });
  }
});

module.exports = router;
