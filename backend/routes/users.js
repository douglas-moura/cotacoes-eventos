const express = require('express')
const router = express.Router()
const bcrypt = require("bcrypt")

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// rota que retorna todos os usuários
router.get('/', async (req, res) => {
    //req.params   | parâmetros da URL
    //req.body     | dados enviados no corpo
    //req.query    | query string da URL

    const users = await prisma.user.findMany()
    res.json(users)
})

// rota que cria um novo registro de usuário
router.post('/', async (req, res) => {
    //req.params   | parâmetros da URL
    //req.body     | dados enviados no corpo
    //req.query    | query string da URL

    const senhaHash = await bcrypt.hash(req.body.senha, 10)

    const novoUser = await prisma.user.create({
        data: {
            nome: req.body.nome,
            email: req.body.email,
            senha: senhaHash
        }
    })

    res.json(novoUser)
})

router.get('/:email', async (req, res) => {
    //req.params   | parâmetros da URL
    //req.body     | dados enviados no corpo
    //req.query    | query string da URL

    const email = req.params.email

    const user = await prisma.user.findUnique({
        where: { email },
        // retorna apenas as colunas abaixo para melhor segurança
        select: {
            id: true,
            nome: true,
            email: true
        }
    })

    if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado"})
    }

    res.json(user)
})

router.patch("/:email", async (req, res) => {
    //req.params   | parâmetros da URL
    //req.body     | dados enviados no corpo
    //req.query    | query string da URL

    const dados = { ...req.body }

    if (dados.senha) {
        dados.senha = await bcrypt.hash(dados.senha, 10)
    }

    const user = await prisma.user.update({
        where: {
            email: req.params.email
        },
        data: dados
    })

    res.json(user)
})

module.exports = router