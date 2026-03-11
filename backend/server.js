// o Express executa o código em sequência, de cima para baixo, linha por linha

require('dotenv').config()

const express = require('express')
const cors = require('cors')

// importando rotas de no server
const usersRoutes = require('./routes/users')
const acessosRoutes = require('./routes/acessos')
const loginRoutes = require('./routes/login')

const app = express()

// middlewares GLOBAIS - funções que são executadas antes de chegar nas rotas (precisam vir antes das rotas)
// verificar autenticação
// validar dados
// registrar logs
// tratar erros
// .use() -> use este middleware em TODAS as requisições
app.use(cors())
app.use(express.json())

// "inserindo" rotas no app (servidor)
app.use('/users', usersRoutes)
app.use('/acessos', acessosRoutes)
app.use('/login', loginRoutes)

// rotas - definem os endpoints da API, ou seja, as URLs que o frontend pode acessar para obter ou enviar dados
app.get('/', (req, res) => {
    res.send('Backend funcionando')
})

// define que o backend esta "escutando" todas as requisições que chegam na porta 3000, ou seja, o backend só vai responder as requisições que chegarem nessa porta
app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000')
})