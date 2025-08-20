const express = require('express') 
const {engine} = require('express-handlebars') 
const conn = require('./db/conn')
const port = 3000 

const user = require('./models/user')

const app = express() 

app.use(express.urlencoded({
        extended: true 
    })
)

app.use(express.json()) 

app.engine('handlebars', engine()) 
app.set('view engine', 'handlebars') 

app.use(express.static('public')) 

app.get('/', (req, res) => { 
    res.render('home') 
})


conn.sync().then(() => {
    app.listen(3000, ()=> { 
    console.log(`APP rodando na porta ${port}`) 
    })
})
.catch((err) => console.log(err))
