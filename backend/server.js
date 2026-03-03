require('dotenv').config()

const express = require('express')
const cors = require('cors')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()
const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Backend funcionando')
})

app.get('/users', async (req, res) => {
    const users = await prisma.user.findMany()
    res.json(users)
})

app.post('/users', async (req, res) => {
    const { name } = req.body

    const newUser = await prisma.user.create({
        data: {
            name
        }
    })

    res.json(newUser)
})

app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000')
})