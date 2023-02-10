const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req, res, next) => {  //next позвол продолжить выполнение запроса
    if (req.method === 'OPTIONS') {  //специальный метод который проверяет дотупноть сервера
        return next()
    }
    
    //если POST или GET, Catch делаем в try catch потому что могут быть ошибки
    try {
        const token = req.headers.authorization.split(' ')[1] //токен будем передвать с фронта Bearer TOKEN
        if (!token) {  // если нет токена
            res.status(401).json({message: 'Нет авторизации'})
        }
        //разкодируем токен
        const  decoded = jwt.verify(token, config.get('jwtSecret'))
        req.user = decoded // кладем разкодированный токен
        next()
    } catch (e) {
        res.status(401).json({message: 'Нет авторизации'})
    }
}