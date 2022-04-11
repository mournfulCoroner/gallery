const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    if(req.method == 'OPTIONS') {
        return next();
    }
    
    try {
        const token = req.headers.authorization.split(' ')[1]
        if(!token) {
            return res.status(401).json({message: 'Ошибка авторизации'})
        }
        const decoded = jwt.verify(token, process.env.SECRET_CODE)

        if ((req.method == 'PUT' || req.method == 'POST') && decoded.role !== "Admin"){
            return res.status(403).json({ message: 'Ошибка доступа' })
        }
        req.user = decoded
        next()
    } catch (error) {
        return res.status(401).json({ message: 'Ошибка авторизации' })
    }
}