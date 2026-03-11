const express = require('express')
const router = express.Router()
const bcrypt = require("bcrypt")

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

router.get('/', (req, res) => {
    res.send('Rota de login funcionando')
})

router.post('/', async (req, res) => {
    // pega os dados do body da requisição
    const { email, senha } = req.body

    // verifica se os dados estão vazios (frontend também verifica previamente)
    if (!email || !senha) {
        return res.status(400).json({ error: "E-mail e senha obrigatórios"})
    }

    // encontra o e-mail do formulário no banco
    const user = await prisma.user.findUnique({
        where: { email }
    })

    if (!user) {
        return res.status(400).json({ error: "Usuário não encontrado"})
    }

    const senhaValida = await bcrypt.compare(
        senha,        // senha digitada
        user.senha    // hash salvo no banco
    )

    if (!senhaValida) {
        return res.status(400).json({ error: "Senha incorreta"})
    }

    res.json({userId: user.id, userEmail: user.email})
})

module.exports = router