const Category = require('../models/Category')
const { validationResult } = require("express-validator");

class CategoryController {
    async createCategory(req, res) {
        try {
            const { name } = req.body;

            const potentialCategory = await Category.findOne({ name });

            if (potentialCategory) {
                return res.status(400).json({ message: `Категория с именем ${name} уже существует` })
            }

            const category = new Category({ name });
            await category.save();
            return res.json({category, message: "Категория была успешно создана"})
        } catch (error) {
            console.log(error);
            return res.status(400).json(e);
        }
    }

    async getCategory(req, res) {
        try {
            const categories = await Category.find({})
            return res.json(categories)
        } catch (error) {
            console.log(error);
            return res.status(400).json(e);
        }
    }
}

module.exports = new CategoryController()