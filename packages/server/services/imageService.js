const fs = require('fs')
const Jimp = require("jimp")

class ImageService {

    async createImage(req, image, categoryName) {
        const filePath = `${req.filePath}/${categoryName}/${image.name}`
        const name = image.name.substring(0, image.name.lastIndexOf('.'))
        return new Promise(((resolve, reject) => {
            try {
                if (!fs.existsSync(filePath)) {

                    image.mv(filePath).then(() => {
                        Jimp.read(filePath, (err, file) => {
                            if (err) throw err;
                            file.resize(1300, Jimp.AUTO)
                                .write(`${req.filePath}/${categoryName}/${image.name}`)
                            file.cover(150, 150, Jimp.VERTICAL_ALIGN_MIDDLE | Jimp.HORIZONTAL_ALIGN_CENTER)
                                .quality(60)
                                .write(`${req.filePath}/${categoryName}/${name}-prev.jpg`)
                        })
                    })
                    return resolve({ message: "Картинка успешно создана" })
                }
                else {
                    return reject({ message: "Картинка уже существует" })
                }
            } catch (error) {
                return reject({ message: 'Ошибка картинки' })
            }
        }))
    }

    async deleteImage(req, filePath, previewFilePath) {
        return new Promise((resolve, reject) => {
            try {
                let mainPath = `${req.filePath}/${filePath.slice(7, filePath.length)
                    }`
                console.log(mainPath);
                if (fs.existsSync(mainPath)) {
                    fs.unlink(mainPath, (err) => {
                        if (err) throw err;
                    })
                    fs.unlink(`${req.filePath}/${previewFilePath.slice(7, previewFilePath.length).replace('/', '\\')
                        }`, (err) => {
                            if (err) throw err
                        })
                    return resolve({ message: "Картинка успешно удалена" })
                }
                else {
                    return reject({ message: "Такой картинки на сервере не существует" })
                }
            } catch (error) {
                return reject({ message: 'Ошибка удаления картинки' })
            }

        })
    }

}

module.exports = new ImageService()