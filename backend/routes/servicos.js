const express = require('express')
const router = express.Router()

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// rota que retorna todos os servicos
router.get('/', async (req, res) => {
    //req.params   | parâmetros da URL
    //req.body     | dados enviados no corpo
    //req.query    | query string da URL

    const servicos = await prisma.servico.findMany()
    res.json(servicos)
})


// rota que retorna servicos de acordo com id do espaço
router.get('/:espacoId', async (req, res) => {
    //req.params   | parâmetros da URL
    //req.body     | dados enviados no corpo
    //req.query    | query string da URL

    const espacoId = req.params.espacoId

    const servicos = await prisma.servico.findMany({
        where: { espaco_id: Number(espacoId) },
        select: {
            id: true,
            tipo: true,
            valor_base: true,
            valor_promo: true,
            valor_promo_status: true,
            tx_pessoa: true,
            tx_pessoa_status: true,

            diaria: {
                select: {
                    dia_semana: true,
                    ativo: true
                }
            }
        }
    })
    res.json(servicos)
})

// rota que cria um novo registro de serviço
router.post('/', async (req, res) => {
    //req.params   | parâmetros da URL
    //req.body     | dados enviados no corpo
    //req.query    | query string da URL

    const novoServico = await prisma.servico.create({
        data: {
            tipo: req.body.tipo,
            valor_base: req.body.valores.valorPadrao,

            valor_promo: req.body.valores.valorPromo.valor,
            valor_promo_status: req.body.valores.valorPromo.ativo,

            tx_pessoa: req.body.valores.taxaPessoa.valor,
            tx_pessoa_status: req.body.valores.taxaPessoa.ativo,

            espaco_id: req.body.espacoId,
        }
    })

    res.json(novoServico)
})

module.exports = router