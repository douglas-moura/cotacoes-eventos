// importar a biblioteca Express para criar o servidor
const express = require('express')
// importar a biblioteca CORS para permitir requisições de outros domínios/portas
const cors = require('cors')

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// criar uma instância Servidor do Express
const app = express()

app.use(cors({
    origin: 'http://localhost:5173'
}))

// use registra um middleware
// middleware = função que roda antes da rota
// é um middleware que permite o servidor entender JSON
app.use(express.json())

// cria uma rota GET para o caminho '/'
app.get('/', (req, res) => {
    res.send('Backend funcionando');
})

// cria uma rota GET para o caminho '/users'
app.get('/users', (req, res) => {
    users = prisma.user.findMany()
    res.json(users)
})

// inicia o servidor na porta 3000
app.listen(3000, () => {
    console.log('Backend rodando em http://localhost:3000')
})