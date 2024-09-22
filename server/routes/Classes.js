const express = require("express");
const router = express.Router();
const { Classes } = require("../models");

// Get all classes
router.get("/", async (req, res) => {
  const listOfClasses = await Classes.findAll();
  res.json(listOfClasses);
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
