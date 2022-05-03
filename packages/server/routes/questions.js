const express = require('express');
const router = express.Router();
const { check } = require("express-validator");
const questionController = require('../controllers/questionController');
const authMiddleware = require('../middleware/auth.middleware');


router.get('/get', questionController.getQuestion)

router.post('/create', authMiddleware, [
    check("text", "Текст вопроса должен быть не меньше трех символов").isLength({ min: 3 })
], questionController.createQuestion)

router.put('/:id/read', authMiddleware, questionController.readQuestion)

router.delete('/:id/delete', authMiddleware, questionController.deleteQuestion)

module.exports = router;
