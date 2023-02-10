const {Router} = require('express')
const config = require('config')
const shortid = require('shortid')
const Link = require('../models/Link')
const auth = require('../middleware/auth.middleware')
const router = Router()

router.post('/generate', auth, async (req, res) => { // добавляем миддлеваре auth чтобы был доступен формат req.user.userId
    try {
        const baseUrl = config.get('baseUrl')
        const {from} = req.body //сфронта получаем объект from те откуда делаем данную ссылку те будем перенаправлть пользователя по данному пути 
    
        const code = shortid.generate() //код для сокращенный ссылки с помощью пакет shortid

        const existing =  await Link.findOne({from}) // првоеряем есть ли такая ссылка

        if (existing) {
            return res.json({link: existing}) // если есть то отправляем 
        }

        const to = baseUrl+'/t/'+code

        const link = new Link ({
            code, to, from, owner: req.user.userId
        })

        await link.save()

        res.status(201).json({link})
    } catch (e) {
        res.status(500).json({ message: 'что то пошло не так, попробуйте снова'})  
    }
})

router.get('/', auth, async (req, res) => {  //добавляем auth и endpoint защищен
    try {
        const links = await Link.find({owner: req.user.userId})// получим список ссылок пользовтеля
        res.json(links)
    } catch (e) {
        res.status(500).json({ message: 'что то пошло не так, попробуйте снова'})  
    }

})

router.get('/:id', auth, async (req, res) => {
    try {
        const link = await Link.findById(req.params.id)// получаем ссылку по ид
        res.json(link)
    } catch (e) {
        res.status(500).json({ message: 'что то пошло не так, попробуйте снова'})  
    }
})

module.exports = router