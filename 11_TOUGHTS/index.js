// 1. IMPORTS PRINCIPAIS
// (Express, Handlebars, Conexão com DB, etc.)
const express = require('express')
const { engine } = require('express-handlebars')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const flash = require('express-flash')
const conn = require('./db/conn')
const port = 5000

// 2. IMPORTAÇÃO DOS MÓDULOS MVC
// (Models, Rotas e Controller)
//models
const Tought = require('./models/Tought')
const User = require('./models/User')
//routes
const toughtsRoutes = require('./routes/ToughtsRoutes')
const authRoutes = require('./routes/authRoutes')

//controller
const ToughtController = require('./controller/ToughtsController')

// 3. CONFIGURAÇÕES DO APP
// (Inicialização do App, formulários, pasta 'public' e View Engine)
const app = express()
app.use(express.static('public'))

//template engine
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')

//receber resposta
app.use(
    express.urlencoded({
        extended: true
    })
)
app.use(express.json())

//session middleware
app.use(
    session({
        name:"session",
        secret: "nosso_secret",
        resave: false,
        saveUninitialized: false,
        store: new FileStore({
            logFn: function() {},
            path: require('path').join(require('os').tmpdir(), 'sessions'),
        }),
        cookie: {
            secure: false,
            maxAge: 360000,
            expires:new Date(Date.now() + 360000),
            httpOnly: true,            
        }
    })
)
//flash messages 
app.use(flash())

//set session to res
app.use((req, res, next) => {
    if(req.session.userid) {
        res.locals.session = req.session
    }
    next()
})

// 4. ROTAS
// (O App "usa" as rotas importadas aqui)

//app.use
app.use('/toughts', toughtsRoutes)
app.use('/', authRoutes)

//app.get
app.get('/', ToughtController.showToughts)

//app.post



// 5. SERVIDOR
// (Conecta ao banco e liga o site)
conn
//.sync({force: true})
.sync()
.then(() => {
    app.listen(5000)
})
.catch((err) => console.log(err))

