const Category = require('../models/Category')
const Image = require('../models/Image')
const categoryService = require("../services/categoryService")


class CategoryController {
    async createCategory(req, res) {
        try {
            const { name } = req.body;

            const potentialCategory = await Category.findOne({ name });

            if (potentialCategory) {
                return res.status(400).json({ message: `Категория с именем ${name} уже существует` })
            }

            const category = new Category({ name });
            await categoryService.createDir(category)
            await category.save();
            return res.json({category, message: "Категория была успешно создана"})
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
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
            await Category.findByIdAndDelete(id, function (err, result) {
                if (err) {
                    throw err;
                } else {
                    return res.json({ message: `Категория успешно удалена: ${result}` })
                }
            }).clone()
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
            Category.findByIdAndUpdate(id, {name}, function(err, result){
                if(err){
                    throw err;
                }else{
                    return res.json({ message: `Категория успешно обновлена` })
                }
            }).clone()
           
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);            
        }
    }
    async getImages(req, res){
        try {
            const id = req.params.id
            let images = await Image.find({category: id})
            if(images){
                return res.json(images)
            }
        }
        catch(error){
            console.log(error);
            return res.status(500).json(error);   
        }
    }
}

module.exports = new CategoryController()