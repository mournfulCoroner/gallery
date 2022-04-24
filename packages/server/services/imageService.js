const fs = require('fs')
const Jimp = require("jimp")

class ImageService {

    async createImage(image, categoryName) {
        const filePath = `${process.env.filePath}\\${categoryName}\\${image.name}`
        const name = image.name.substring(0, image.name.lastIndexOf('.')) 
        return new Promise(((resolve, reject) => {
            try {
                if (!fs.existsSync(filePath)) {
                    image.mv(filePath).then(() => {
                        Jimp.read(filePath, (err, file) => {
                            if (err) throw err;
                            file.cover(150, 150, Jimp.VERTICAL_ALIGN_MIDDLE | Jimp.HORIZONTAL_ALIGN_CENTER)
                                .quality(60)
                                .write(`${process.env.filePath}\\${categoryName}\\${name}-prev.jpg`)
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

}

module.exports = new ImageService()