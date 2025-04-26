const express = require("express");
const router = express.Router();
const Student = require("../models/Student.js");

// GET all students
router.get("/", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET a student by ID
router.get("/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST a new student
router.post("/", async (req, res) => {
  const student = new Student({
    name: req.body.name,
    email: req.body.email,
    rollNumber: req.body.rollNumber,
    branch: req.body.branch,
    semester: req.body.semester,
    phoneNumber: req.body.phoneNumber,
  });

  try {
    const newStudent = await student.save();
    res.status(201).json(newStudent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT (update) a student
router.put("/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    if (req.body.name) student.name = req.body.name;
    if (req.body.email) student.email = req.body.email;
    if (req.body.rollNumber) student.rollNumber = req.body.rollNumber;
    if (req.body.branch) student.branch = req.body.branch;
    if (req.body.semester) student.semester = req.body.semester;
    if (req.body.phoneNumber) student.phoneNumber = req.body.phoneNumber;

    const updatedStudent = await student.save();
    res.json(updatedStudent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE a student
router.delete("/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
