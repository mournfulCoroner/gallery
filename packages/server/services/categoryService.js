const fs = require('fs')


class CategoryService {

    createDir(req, category) {
        const filePath = `${req.filePath}/${category.name}`
        console.log(filePath);
        return new Promise(((resolve, reject) => {
            try {
                if (!fs.existsSync(filePath)) {
                    fs.mkdirSync(filePath)
                    return resolve({ message: "Success creation" })
                }
                else {
                    return reject({ message: "Category dir already exist" })
                }
            } catch (error) {
                return reject({ message: error })
            }
        }))
    }

}

module.exports = new CategoryService()