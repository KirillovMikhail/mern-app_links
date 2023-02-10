const {Router} = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const {check, validationResult} = require('express-validator')
const User= require('../models/User')
const router = Router()

// /api/auth/register
router.post('/register',
    [ //валидатор на стороне ссервера
        check('email', 'некоректнй email').isEmail(), //что проверяем и тект ошибки
        check('password', 'мин длинна символов - 6').isLength({min: 6})
    ],
    async (req, res)=> {   // это endpoint
        
    try {
        const errors = validationResult(req)

        
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Некоректные данные при регистрации'
            })
        }

        const {email, password} = req.body // точто получаем с фронта
       
        const candidate = await User.findOne({ email }) //ключ и значсовпадает можно сократить
        
        if (candidate) {
           return res.status(400).json({ message: 'Такой пользователь уже существует'})
        }

        const hashedPassword = await bcrypt.hash(password, 12) //12 - степень шифрования

        const user = new User({ email, password: hashedPassword })

        await user.save()

        res.status(201).json({message: 'пользователь создан'})



    } catch (e) {
        res.status(500).json({ message: 'что то пошло не так, попробуйте снова'})  // базовая ошибка
    }
})

// /api/auth/login
router.post('/login',
    [ //валидатор на стороне ссервера
    check('email', 'Введите корректный email').normalizeEmail().isEmail(), //что проверяем и тект ошибки
    check('password', 'Введите пароль').exists()
    ],
    async (req, res)=> {   // это endpoint
    try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
            message: 'Некоректные данные при входе в ситему'
        })
    }

    const {email, password} = req.body // точто получаем с фронта
    console.log(req.body)

    const user = await User.findOne({ email: email}) //ключ и значсовпадает можно сократить

    if (!user) {
        return res.status(400).json({ message: 'Пользователь не найден'})
     }

    const isMatch = await bcrypt.compare(password, user.password) //сравниваем хешированные пароли с фрота и из базы

    if (!isMatch) {
        return res.status(400).json({message: 'Неверный пароль, попробуй снова'})
    }

    const token = jwt.sign(
        { userId: user.id },
        config.get('jwtSecret'),
        { expiresIn: '1h'} //через сколько токен прекратит существоание, 1ч
    )

    res.json({ token, userId: user.id }) //статус можно не указывать потому то по умол -200


    



    } catch (e) {
    res.status(500).json({ message: 'что то пошло не так, попробуйте снова'})  // базовая ошибка
    }
    
})

module.exports = router