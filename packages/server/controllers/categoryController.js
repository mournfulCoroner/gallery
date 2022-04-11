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
            return res.status(500).json(e);
        }
    }

    async getCategory(req, res) {
        try {
            let categories;
            if(req.query.categoryId){
                categories = await Category.find({_id: req.query.categoryId})
            }
            else if(req.query.categoryName){
                categories = await Category.find({ name: req.query.categoryName })
            }
            else{
                categories = await Category.find({})
            }
            return res.json(categories)
        } catch (error) {
            console.log(error);
            return res.status(400).json(e);
        }
    }

    async deleteCategory(req, res) {
        try {
            const id = req.params.id
            if(!id){
                return res.status(400).json({ message: `Некорректный запрос` })
            }
            let res = await Category.deleteOne({_id: id})
            if (res.deletedCount != 1) {
                return res.status(404).json({ message: `Категория с id ${id} не найдена` })
            }
            return res.json({message: "Категория успешно удалена"})
        } catch (error) {
            console.log(error);
            return res.status(500).json(e);
        }
    }

    async updateCategory(req, res){
        try {
            const id = req.params.id
            const {name} = req.body;
            if (!id || !name) {
                return res.status(400).json({ message: `Некорректный запрос` })
            }
            let res = await Category.updateOne({ _id: id })
            if(res.modifiedCount != 1){
                return res.status(404).json({ message: `Категория с id ${id} не найдена` })
            }
            return res.json({ message: "Категория успешно обновлена" })
        } catch (error) {
            console.log(error);
            return res.status(500).json(e);            
        }
    }
}

module.exports = new CategoryController()