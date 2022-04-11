const express = require('express');
const router = express.Router();
const { check } = require("express-validator");
const categotyController = require("../controllers/categoryController");
const authMiddleware = require("../middleware/auth.middleware");
const categoryController = require('../controllers/categoryController');


router.get('/get', categoryController.getCategory)

router.post('/create', authMiddleware, [
    check("name", "Имя категории должно быть не длиннее 12 символов").isLength({ max: 12 })
], categotyController.createCategory)

router.delete('/:id/delete', authMiddleware, categoryController.deleteCategory)

router.put('/:id/update', authMiddleware, categoryController.updateCategory)

module.exports = router;
