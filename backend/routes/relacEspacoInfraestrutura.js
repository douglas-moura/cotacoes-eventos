const express = require('express')
const router = express.Router()

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// rota que retorna todos os relacionamento de espaço e infraestrutura
router.get('/', async (req, res) => {
    //req.params   | parâmetros da URL
    //req.body     | dados enviados no corpo
    //req.query    | query string da URL

    const relacionamentosEspacInfra = await prisma.espacoInfra.findMany()
    res.json(relacionamentosEspacInfra)
})

// rota que cria um novo registro de relacionamento de espaço e infraestrutura
router.post('/', async (req, res) => {
    //req.params   | parâmetros da URL
    //req.body     | dados enviados no corpo
    //req.query    | query string da URL

    const novoRelacionamento = await prisma.espacoInfra.create({
        data: {
            espaco_id: req.body.espaco_id,
            infra_id: req.body.infra_id
        },
    })
    res.json(novoRelacionamento)
})

// rota que apaga todos os registro de relacionamento de espaço e infraestrutura de acordo com id do espaço
router.delete('/espaco/:espacoId', async (req, res) => {
    //req.params   | parâmetros da URL
    //req.body     | dados enviados no corpo
    //req.query    | query string da URL

    const espacoId = Number(req.params.espacoId)

    if (!espacoId) {
        return res.status(400).json({ error: 'IDs inválidos' })
    }

    const result = await prisma.espacoInfra.deleteMany({
        where: { espaco_id: espacoId }
    })

    res.json(result)
})

// rota que apaga um registro de relacionamento de espaço e infraestrutura
router.delete('/:infraId/:espacoId', async (req, res) => {
    //req.params   | parâmetros da URL
    //req.body     | dados enviados no corpo
    //req.query    | query string da URL

    const infraId = Number(req.params.infraId)
    const espacoId = Number(req.params.espacoId)

    if (!espacoId || !infraId) {
        return res.status(400).json({ error: 'IDs inválidos' })
    }

    const result = await prisma.espacoInfra.deleteMany({
        where: { espaco_id: espacoId, infra_id: infraId }
    })

    res.json(result)
})

module.exports = router