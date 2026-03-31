const express = require('express')
const router = express.Router()

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// rota que retorna todas as infraestruturas
router.get('/', async (req, res) => {
    //req.params   | parâmetros da URL
    //req.body     | dados enviados no corpo
    //req.query    | query string da URL

    const infraestruturas = await prisma.infraestrutura.findMany()
    res.json(infraestruturas)
})

// rota que cria um novo registro de infraestruturas
router.post('/', async (req, res) => {
    //req.params   | parâmetros da URL
    //req.body     | dados enviados no corpo
    //req.query    | query string da URL

    const novaInfra = await prisma.infraestrutura.create({
        data: req.body,
    })

    res.json(novaInfra)
})

// rota que busca infraestruturas pela ID
router.get('/:id', async (req, res) => {
    //req.params   | parâmetros da URL
    //req.body     | dados enviados no corpo
    //req.query    | query string da URL

    const infraID = req.params.id

    const infra = await prisma.infraestrutura.findUnique({
        where: { id },
        // retorna apenas as colunas abaixo para melhor segurança
        select: {
            id: true,
            titulo: true,
            icone: true
        }
    })

    if (!infra) {
        return res.status(404).json({ error: "Info não encontrada"})
    }

    res.json(infra)
})

module.exports = router

/*
INSERT INTO infraestruturas (titulo, icone) VALUES
('Elevador', 'tabler:elevator'),
('Acessibilidade', 'tabler:disabled'),
('Wi-Fi', 'tabler:wifi'),
('Estacionamento', 'tabler:car'),
('Ar-condicionado', 'tabler:air-conditioning'),
('Espaço kids', 'tabler:mood-kid'),
('Varanda', 'tabler:photo-circle'),
('Jardim', 'tabler:plant'),
('Salas de Escritório', 'tabler:users-group'),
('Área coberta', 'tabler:sun-off'),
('Área externa', 'tabler:sun'),
('Telão e Projetor', 'tabler:screen-share'),
('Portaria / recepção', 'tabler:door-enter'),
('Depósito / almoxarifado', 'tabler:package'),
('Cozinha equipada', 'tabler:cooker'),
('Espaço pet friendly', 'tabler:paw'),
('Área instagramável', 'tabler:brand-instagram'),
('Piscina', 'tabler:pool'),
('Churrasqueira', 'tabler:grill'),
('Serviço de buffet', 'tabler:chef-hat'),
('Sistema de som básico', 'tabler:music');
*/