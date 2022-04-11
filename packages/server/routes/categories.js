const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const { check, validationResult } = require("express-validator");
const categotyController = require("../controllers/categoryController");
const authMiddleware = require("../middleware/auth.middleware");


router.get('/get', async (req, res) => {
    const categories = await Category.find({}).exec();

    res.send(categories);
})

router.post('/create', authMiddleware, [
    check("name", "Имя категории должно быть длиннее 3 символов").isLength({ min: 3 })
], categotyController.createCategory)

module.exports = router;
