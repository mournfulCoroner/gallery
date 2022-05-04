const Category = require('../models/Category')
const Image = require('../models/Image')
const imageService = require('../services/imageService')
const ImageService = require('../services/imageService')


class ImageController {

    async uploadImage(req, res) {
        try {
            const file = req.files.file
            const { categoryId, description } = req.body
            const category = await Category.findById(categoryId)
            if (!category) {
                return res.status(404).json({ message: "Такой категории не существует" })
            }
            await ImageService.createImage(req, file, category.name)
            const dbImage = new Image({
                name: file.name,
                description,
                category: categoryId,
                size: file.size,
                path: `/files/${category.name}/${file.name}`,
                previewPath: `/files/${category.name}/${file.name.substring(0, file.name.lastIndexOf('.'))
                    }-prev.jpg`
            })
            await dbImage.save()
            return res.json(dbImage)
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Ошибка загрузки" })
        }
    }
    async deleteImage(req, res) {
        try {
            const imageId = req.params.id
            const dbImage = await Image.findById(imageId)
            if (!dbImage) {
                return res.status(404).json({ message: "Такого изображения не существует" })
            }
            await imageService.deleteImage(req, dbImage.path, dbImage.previewPath)
            await dbImage.remove()
            return res.json({message: "Картинка успешно удалена"})
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Ошибка удаления картинки" })
        }
    }

    async updateImage(req, res) {
        try {
            const id = req.params.id
            const { name, description } = req.body
            if (!id || !name || !description) {
                return res.status(400).json({ message: `Некорректный запрос` })
            }
            Image.findByIdAndUpdate(id, { name, description }, function (err, result) {
                if (err) {
                    throw err;
                } else {
                    return res.json({ message: `Картинка успешно обновлена` })
                }
            }).clone()
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    }

}

module.exports = new ImageController()