const Category = require('../models/Category')
const Image = require('../models/Image')
const ImageService = require('../services/imageService')


class ImageController {

    async uploadImage(req, res) {
        try {
            const file = req.files.file
            const { categoryId, description } = req.body
            console.log(categoryId);
            const category = await Category.findById(categoryId)
            if (!category) {
                return res.status(404).json({ message: "Такой категории не существует" })
            }
            await ImageService.createImage(file, category.name)
            const dbImage = new Image({
                name: file.name,
                description,
                category: categoryId,
                size: file.size,
                path: `\\${category.name}\\${file.name}`,
                previewPath: `\\${category.name}\\${file.name.substring(0, file.name.lastIndexOf('.'))
                    }-prev.jpg`
            })
            await dbImage.save()
            return res.json(dbImage)
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Ошибка загрузки" })
        }
    }

}

module.exports = new ImageController()