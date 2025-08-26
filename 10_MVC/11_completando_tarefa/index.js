// 1. IMPORTS PRINCIPAIS
// (Express, Handlebars, Conexão com DB, etc.)

const express = require('express')
const { engine } = require('express-handlebars')
const conn = require('./db/conn')
const port = 3000




// 2. IMPORTAÇÃO DOS MÓDULOS MVC
// (Models e Rotas)

const Task = require('./models/Task')
const taskRoutes = require('./routes/TaskRoutes')

// 3. CONFIGURAÇÕES DO APP
// (Inicialização do App, formulários, pasta 'public' e View Engine)

const app = express()
app.use(express.urlencoded({
        extended: true 
    })
)
app.use(express.json()) 
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.use(express.static('public'))

// 4. ROTAS
// (O App "usa" as rotas importadas aqui)
app.use('/tasks', taskRoutes)

// 5. SERVIDOR
// (Conecta ao banco e liga o site)
conn
.sync()
//.sync({force: true}) //apagar tudo do banco
.then(() => {
    app.listen(3000, ()=> { 
    console.log(`APP rodando na porta ${port}`) 
    })
})
.catch((err) => console.log(err))