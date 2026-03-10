const express = require('express')
const router = express.Router()

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// rota que retorna todos os usuários
router.get('/', async (req, res) => {
    const users = await prisma.user.findMany()
    res.json(users)
})

// rota que cria um novo registro de usuário
router.post('/', async (req, res) => {
    const novoUser = await prisma.user.create({
        data: req.body
    })
    res.json(novoUser)
})

router.get('/:email', async (req, res) => {
    const email = req.params.email
    const user = await prisma.user.findUnique({
        where: { email }
    })

    if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado"})
    }

    res.json(user)
})

module.exports = router