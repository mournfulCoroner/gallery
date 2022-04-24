const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt')
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/auth.middleware")

router.get('/', async (req, res, next) => {
    const users = await User.find({}).exec();

    res.send(users);
});

router.post('/registration', [
    check("nickname", "Никнейм должен быть длиннее 5 и меньше 23 символов").isLength({ min: 5, max: 23 }),
    check("password", "Пароль должен быть длиннее 3 и меньше 12 символов").isLength({ min: 3, max: 12 })
], async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ message: "Некорректный запрос", errors })
        }
        const { nickname, password } = req.body;

        const potentialUser = await User.findOne({ nickname });

        if (potentialUser) {
            return res.status(400).json({ message: `Пользователь с ником ${nickname} уже существует` })
        }

        const hashPassword = await bcrypt.hash(password, 4)
        const user = new User({ nickname, password: hashPassword, role: 'User' });
        await user.save();
        return res.json({ message: "Пользователь был успешно создан" })

    }
    catch (e) {
        console.log(e);
        res.send({ message: "Ошибка сервера" });
    }
})

router.post('/login', async (req, res) => {
    try {
        const { nickname, password } = req.body;
        const potentialUser = await User.findOne({ nickname });

        if (!potentialUser) {
            return res.status(404).json({ message: `Такой пользователь не существует` })
        }
        const isPassValid = bcrypt.compareSync(password, potentialUser.password);
        if (!isPassValid) {
            return res.status(400).json({ message: "Пароль введён неверно" })
        }

        const token = jwt.sign({ id: potentialUser.id, role: potentialUser.role }, process.env.SECRET_CODE)
        return res.json(
            {
                token,
                user: {
                    id: potentialUser.id,
                    nickname: potentialUser.nickname,
                    role: potentialUser.role
                }
            }
        )
    }
    catch (e) {
        console.log(e);
        res.send({ message: "Ошибка сервера" });
    }
})

router.get('/auth', authMiddleware, async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.user.id })

        if (!user) {
            return res.status(404).json({ message: `Пользователь не найден` })
        }

        const token = jwt.sign({ id: user.id, role: user.role }, process.env.SECRET_CODE)
        return res.json(
            {
                token,
                user: {
                    id: user.id,
                    nickname: user.nickname,
                    role: user.role
                }
            }
        )
    }
    catch (e) {
        console.log(e);
        res.send({ message: "Ошибка сервера" });
    }
})

router.put('/:nickname/role', authMiddleware, async (req, res) => {
    try {
        const targetUser = await User.findOne({ nickname: req.params.nickname })
        if(!targetUser){
            return res.status(404).json({ message: `Пользователь не найден` })
        }
        targetUser.role = req.body.role
        targetUser.save()
        return res.json({ message: "Права успешно изменены" })

    } catch (error) {
        console.log(e);
        res.send({ message: "Ошибка сервера" });
    }
})



module.exports = router;
