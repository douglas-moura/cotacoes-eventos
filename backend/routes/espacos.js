const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/authMiddleware')

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// rota que retorna todos os espacos
router.get('/', async (req, res) => {
    //req.params   | parâmetros da URL
    //req.body     | dados enviados no corpo
    //req.query    | query string da URL

    const espacos = await prisma.espaco.findMany()
    res.json(espacos)
})

// rota que cria um novo registro de espaco
router.post('/', authMiddleware, async (req, res) => {
    //req.params   | parâmetros da URL
    //req.body     | dados enviados no corpo
    //req.query    | query string da URL

    const userId = req.user.id

    const novoEspaco = await prisma.espaco.create({
        data: {
            nome: req.body.nome,
            descricao: req.body.descricao,
            proprietario_id: userId,
            area: req.body.area,
            capacidade: req.body.capacidade,
            ambientes: req.body.ambientes,
            quantidadeBanheiros: req.body.quantidadeBanheiros,
            ativo: true
        }
    })

    res.json(novoEspaco)
})

module.exports = router