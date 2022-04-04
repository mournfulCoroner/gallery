const express = require('express');
const router = express.Router();
const User = require('../db/models/User');
const bcrypt = require('bcrypt')
const {check, validationResult} = require("express-validator");
const jwt = require("jsonwebtoken");

router.get('/', async (req, res, next) => {
    const users = await User.find({}).exec();

    res.send(users);
});

router.post('/registration', [
    check("nickname", "Никнейм должен быть длиннее 5 и меньше 23 символов").isLength({min: 5, max: 23}),
    check("password", "Пароль должен быть длиннее 3 и меньше 12 символов").isLength({min: 3, max: 12})
], async (req, res) => {
    try{
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({message: "Некорректный запрос", errors})
        }
        const {nickname, password} = req.body;

        const potentialUser = await User.findOne({nickname});

        if(potentialUser){
            return res.status(400).json({message: `Пользователь с ником ${nickname} уже существует`})
        }

        const hashPassword = await bcrypt.hash(password, 4)
        const user = new User({nickname, password: hashPassword});
        await user.save();
        return res.json({message: "Пользователь был успешно создан"})

    }
    catch(e){
        console.log(e);
        res.send({message: "Ошибка сервера"});
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
        if(!isPassValid){
            return res.status(400).json({message: "Пароль введён неверно"})
        }

        const token = jwt.sign({ id: potentialUser.id }, process.env.SECRET_CODE)
        return res.json(
            {
                token,
                user: {
                    id: potentialUser.id,
                    nickname: potentialUser.nickname
                }
            }
        )
    }
    catch (e) {
        console.log(e);
        res.send({ message: "Ошибка сервера" });
    }
})

module.exports = router;
