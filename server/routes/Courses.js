const express = require("express");
const router = express.Router();
const { Users, Courses, Student_Courses } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

// Get all courses for the authenticated user
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
router.get("/:course_id", validateToken, async (req, res) => {
  const id = req.params.course_id;
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
router.post("/", validateToken, async (req, res) => {
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

// Update a course by ID
router.put("/:id", validateToken, async (req, res) => {
  const courseId = req.params.id;
  const { title, language, objective, status, description } = req.body;

  try {
    const course = await Courses.findByPk(courseId);

    if (!course) {
      return res.status(404).json({ error: "Lesson not found." });
    }

    await course.update({
      title,
      language,
      objective,
      status,
      description,
    });
    res.status(200).json({ message: "Lesson updated successfully.", course });
  } catch (error) {
    console.error("Error updating lesson:", error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the lesson." });
  }
});

// Delete a course by ID
router.delete("/:course_id", validateToken, async (req, res) => {
  const courseId = req.params.course_id;
  try {
    // Check if the course exists
    const course = await Courses.findByPk(courseId);

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
    const topCourses = await Courses.findAll({
      where: { teacher_id: userId },
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: Student_Courses,
          as: "Student", // Ensure this matches the alias used in the association
        },
      ],
    });
    console.log(topCourses);
    res.json(topCourses);
  } catch (error) {
    console.log(error);
    console.log(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching top courses" });
  }
});

// Get all courses for student to sign-up
router.get("/unregistered/all-courses", validateToken, async (req, res) => {
  try {
    const listOfCourses = await Courses.findAll({
      include: [
        {
          model: Users,
          as: "Teacher", // Ensure this matches the alias used in the association
          attributes: ["username", "fullname", "profile_picture"], // Fetch only the username field
        },
      ],
    });

    // Map the results to include teacher.username at the top level of each course
    const formattedCourses = listOfCourses.map((course) => {
      return {
        ...course.toJSON(),
        teacher_username: course.Teacher?.username || null,
        teacher_fullname: course.Teacher?.fullname || null,
        teacher_profile_picture: course.Teacher?.profile_picture || null,
      };
    });

    res.json(formattedCourses);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching courses." });
  }
});

// Get top 3 courses based on created time
router.get("/sorted/all/top-3", validateToken, async (req, res) => {
  try {
    // Fetch the top 3 courses for the authenticated user, ordered by createdAt descending
    const topCourses = await Courses.findAll({
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: Student_Courses,
          as: "Student", // Ensure this matches the alias used in the association
        },
      ],
    });
    res.json(topCourses);
  } catch (error) {
    console.log(error);
    console.log(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching top courses" });
  }
});

module.exports = router;
