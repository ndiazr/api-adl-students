const Student = require('../models/student.model.js');

exports.findAll = async (req, res) => {
  try {
    const students = await Student.find({});
    res.json(students);
  } catch (error) {
    res.status(500).send({ message: error.message });
    next();
  }
}

exports.findById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      res.status(404).json({
        message: 'Student not found'
      });
    }

    res.json(student);
  } catch (error) {
    res.status(500).send({ message: error.message });
    next();
  }
}

exports.create = async (req, res) => {
  const student = new Student(req.body);

  try {
    let savedStudent = await student.save();
    res.status(201).json(savedStudent);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}

exports.update = async (req, res) => {
  try {
    let updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedStudent) {
      res.status(404).json({
        message: 'Student not found'
      });
    }

    res.json(updatedStudent);
  } catch (error) {
    res.status(500).send({ message: error.message });
    next();
  }
}

exports.delete = async (req, res) => {
  try {
    let studentDeleted = await Student.findByIdAndDelete(req.params.id);

    if (!studentDeleted) {
      res.status(404).json({
        message: 'Student not found'
      });
    }
    
    res.json({ message: 'Student deleted succesfully' });
  } catch (error) {
    res.status(500).send({ message: error.message });
    next();
  }
}