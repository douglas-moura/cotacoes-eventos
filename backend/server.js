// o Express executa o código em sequência, de cima para baixo, linha por linha

require('dotenv').config()

const express = require('express')
const cors = require('cors')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()
const app = express()

// middlewares - funções que são executadas antes de chegar nas rotas (precisam vir antes das rotas)
app.use(cors())
app.use(express.json())

// rotas - definem os endpoints da API, ou seja, as URLs que o frontend pode acessar para obter ou enviar dados
app.get('/', (req, res) => {
    res.send('Backend funcionando')
})

// rotas GET e POST para requisições de usuários
app.get('/users', async (req, res) => {
    const users = await prisma.user.findMany()
    res.json(users)
})

app.post('/users', async (req, res) => {

    const newUser = await prisma.user.create({
        data: req.body
    })

    res.json(newUser)
})

// define que o backend esta "escutando" todas as requisições que chegam na porta 3000, ou seja, o backend só vai responder as requisições que chegarem nessa porta
app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000')
})