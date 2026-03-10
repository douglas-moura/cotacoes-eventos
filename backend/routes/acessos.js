const express = require('express')
const router = express.Router()

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

//
router.get('/', async (req, res) => {
    const acessos = await prisma.acessos.findMany()
    res.json(acessos)
})

router.post('/', async (req, res) => {
    const novoLogin = await prisma.acessos.create({
        data: req.body
    })
    res.json(novoLogin)
})

module.exports = router