const express = require('express')
const router = express.Router()

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// rota que retorna todos os usuários
router.post('/', async (req, res) => {
    const { email, senha } = req.body

    if (!email || !senha) return res.status(400).json({ error: "E-mail e senha obrigatórios"})

    const user = await prisma.user.findUnique({
        where: { email }
    })

    if (!user) return res.status(400).json({ error: "Usuário não encontrado"})

    if (req.params.senha === user.senha) return res.status(400).json({ error: "Senha incorreta"})

    res.json({userId: user.id, userEmail: user.email})
})

module.exports = router