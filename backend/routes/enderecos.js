const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/authMiddleware')

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// rota que retorna todos os enderecos
router.get('/', async (req, res) => {
    //req.params   | parâmetros da URL
    //req.body     | dados enviados no corpo
    //req.query    | query string da URL

    const enderecos = await prisma.endereco.findMany()
    res.json(enderecos)
})

// rota que cria um novo registro de enderecos
router.post('/', authMiddleware, async (req, res) => {
    //req.params   | parâmetros da URL
    //req.body     | dados enviados no corpo
    //req.query    | query string da URL
    
    const userId = req.user.id

    const novoEndereco = await prisma.endereco.create({
        data: {
            rua: req.body.rua,
            numero: req.body.numero,
            complemento: req.body.complemento,
            referencia: req.body.referencia,
            bairro: req.body.bairro,
            cidade: req.body.cidade,
            uf: req.body.uf,
            cep: req.body.cep,
            espaco_id: req.body.espaco_id,
            user_id: userId
        }
    })

    res.json(novoEndereco)
})

module.exports = router