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

// rota que retorna o espaco pelo id
router.get('/:id', async (req, res) => {
    //req.params   | parâmetros da URL
    //req.body     | dados enviados no corpo
    //req.query    | query string da URL

    const espacoId = Number(req.params.id)

    const espaco = await prisma.espaco.findUnique({
        where: { id: espacoId },
        select: {
            id: true,
            nome: true,
            descricao: true
        }
    })

    if (!espaco) {
        return res.status(404).json({ error: "Espaço não encontrado"})
    }

    res.json(espaco)
})

// rota que retorna todos os espaco pelo id do usuario
router.get('/user/:userId', async (req, res) => {
    //req.params   | parâmetros da URL
    //req.body     | dados enviados no corpo
    //req.query    | query string da URL

    const userId = Number(req.params.userId) // o nome do parametro é o mesmo do final da rota após os dois pontos

    const espacosUser = await prisma.espaco.findMany({
        where: { proprietario_id: userId, ativo: true },
        select: {
            id: true,
            nome: true,
            descricao: true,
            visivel: true,
            ativo: true
        }
    })

    if (!espacosUser) {
        return res.status(404).json({ error: "Nenhum espaço encontrado"})
    }

    res.json(espacosUser)
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

// rota para atualizar o espaco
router.patch("/:id", async (req, res) => {
    //req.params   | parâmetros da URL
    //req.body     | dados enviados no corpo
    //req.query    | query string da URL

    const espacoId = Number(req.params.id)

    const espaco = await prisma.espaco.update({
        where: { id: espacoId },
        data: req.body
    })

    if (!espaco) {
        return res.status(404).json({ error: "Espaço não encontrado"})
    }

    res.json(espaco)
})

module.exports = router