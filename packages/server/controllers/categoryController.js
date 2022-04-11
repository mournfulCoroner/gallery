const Category = require('../models/Category')
const { validationResult } = require("express-validator");

class CategoryController {
    async createCategory(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ message: "Некорректный запрос", errors })
            }

            const { name } = req.body;

            const potentialCategory = await Category.findOne({ name });

            if (potentialCategory) {
                return res.status(400).json({ message: `Категория с именем ${name} уже существует` })
            }

            const category = new Category({ name });
            await category.save();
            return res.json({ message: "Категория была успешно создана" })
        } catch (error) {
            console.log(error);
            return res.status(400).json(e);
        }
    }

    async getCategory() {

    }
}

module.exports = new CategoryController()