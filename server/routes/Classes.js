const express = require("express");
const router = express.Router();
const { Classes } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

// Get all classes for the authenticated user
router.get("/", validateToken, async (req, res) => {
  try {
    // Assuming the Classes model has a field 'userId' that links to the user
    const userId = req.user.id; // Access the user ID from the token
    const listOfClasses = await Classes.findAll({ where: { userId: userId } });
    res.json(listOfClasses);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching classes" });
  }
});

// Get a class by ID
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const classDetails = await Classes.findByPk(id);
    if (classDetails) {
      res.json(classDetails);
    } else {
      res.status(404).json({ error: "Class not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching the class details" });
  }
});

// Add a new class
router.post("/", async (req, res) => {
  const addedClass = req.body;
  try {
    await Classes.create(addedClass);
    res.json(addedClass);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while adding the class" });
  }
});

module.exports = router;
