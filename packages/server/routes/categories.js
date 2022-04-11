const express = require('express');
const router = express.Router();
const Category = require('../db/models/Category');
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");


router.get('/get', async (req, res) => {
    const categories = await Category.find({}).exec();

    res.send(categories);
})

router.post('/create', [
    check("name", "Имя категории должно быть длиннее 3 символов").isLength({ min: 3 })
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: "Некорректный запрос", errors })
        }

        const {name} = req.body;

        const potentialCategory = await Category.findOne({ name });

        if (potentialCategory) {
            return res.status(400).json({ message: `Категория с именем ${name} уже существует` })
        }

        const category = new Category({ name });
        await category.save();
        return res.json({ message: "Категория была успешно создана" })

    }
    catch (e) {
        console.log(e);
        res.send({ message: "Ошибка сервера" });
    }
})

module.exports = router;
