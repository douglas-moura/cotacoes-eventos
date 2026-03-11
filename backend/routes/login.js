const express = require('express')
const router = express.Router()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

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

    // gerando o TOKEN no backend
    const token = jwt.sign(
        // PAYLOAD
        // não coloque senha
        // não coloque dados sensíveis
        { id: user.id, email: user.email },
        // "ASSINATURA"
        "segredo_super_secreto",
        // VALIDADE DO TOKEN
        // { expiresIn: "15m" }  // 15 minutos
        // { expiresIn: "1d" }   // 1 dia
        // { expiresIn: "7d" }   // 7 dias
        { expiresIn: "2h" }     // 2 horas
    )

    res.json({token: token, userId: user.id, userEmail: user.email})
})

module.exports = router