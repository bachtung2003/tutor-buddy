const express = require("express");
const router = express.Router();
const { Student_Courses, Courses, Users } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");
const { where } = require("sequelize");

// Get all courses for the authenticated user with addition information of teacher
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
      include: [
        {
          model: Users,
          as: "Teacher", // Ensure this matches the alias used in the association
          attributes: ["username", "fullname", "profile_picture"], // Fetch only the username field
        },
      ],
    });

    // Map the results to include teacher.username at the top level of each course
    const formattedCourses = courses.map((course) => {
      return {
        ...course.toJSON(),
        teacher_username: course.Teacher?.username || null,
        teacher_fullname: course.Teacher?.fullname || null,
        teacher_profile_picture: course.Teacher?.profile_picture || null,
      };
    });

    res.json(formattedCourses);
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

router.get("/get-all/students-list", validateToken, async (req, res) => {
  const userId = req.user.id;

  try {
    // Fetch courses taught by the teacher
    const teacherCourses = await Courses.findAll({
      where: { teacher_id: userId },
      attributes: ["course_id", "title"],
    });

    // Extract course IDs
    const courseIds = teacherCourses.map((course) => course.course_id);

    // Fetch student-course mappings for the teacher's courses
    const studentCourses = await Student_Courses.findAll({
      where: { course_id: courseIds },
      attributes: ["student_id", "course_id"],
    });

    // Extract student IDs
    const studentIds = studentCourses.map((sc) => sc.student_id);

    // Fetch student details and group by student
    const students = await Users.findAll({
      where: { user_id: studentIds },
      attributes: ["user_id", "username", "address", "email", "phone"],
    });

    // Map course titles to student data
    const courseMap = teacherCourses.reduce((acc, course) => {
      acc[course.course_id] = course.title;
      return acc;
    }, {});

    // Combine student details with their attended courses
    const studentDetails = students.map((student) => {
      const coursesAttended = studentCourses
        .filter((sc) => sc.student_id === student.user_id)
        .map((sc) => courseMap[sc.course_id]);

      return {
        ...student.get(), // Extract plain object
        courses: coursesAttended,
      };
    });

    res.json(studentDetails);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

router.get(
  "/get-single-course/student-list/:course_id",
  validateToken,
  async (req, res) => {
    const course_id = req.params.course_id;

    try {
      // Fetch student IDs associated with the course
      const studentsId = await Student_Courses.findAll({
        where: { course_id: course_id },
        attributes: ["student_id"],
      });

      // Ensure studentsId is not empty or null
      if (!studentsId || studentsId.length === 0) {
        return res.json({ message: "No students found for this course." });
      }

      // Retrieve student details
      const studentIds = studentsId.map((item) => item.student_id); // Extract student_ids
      const students = await Users.findAll({
        where: { user_id: studentIds },
        attributes: [
          "user_id",
          "username",
          "address",
          "email",
          "phone",
          "fullname",
        ],
      });
      console.log(students);
      res.json(students);
    } catch (error) {
      console.error(error);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
