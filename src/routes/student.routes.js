const express = require('express');
const router = express.Router();
const studentController = require('../controllers/student.controller');

router.get('/', studentController.findAll);
router.post('/', studentController.create);
router.get('/:id', studentController.findById);
router.put('/:id', studentController.update);
router.delete('/:id', studentController.delete);

module.exports = router;