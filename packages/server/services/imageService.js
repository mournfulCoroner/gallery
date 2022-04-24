const fs = require('fs')

class ImageService {

    createImage(image, categoryName) {
        const filePath = `${process.env.filePath}\\${categoryName}\\${image.name}`
        return new Promise(((resolve, reject) => {
            try {
                if(!fs.existsSync(filePath)) {
                    image.mv(filePath)
                    return resolve({message: "Картинка успешно создана"})
                }
                else {
                    return reject({message: "Картинка уже существует"})
                }
            } catch (error) {
                return reject({message: 'Ошибка картинки'})
            }
        }))
    }

}

module.exports = new ImageService()