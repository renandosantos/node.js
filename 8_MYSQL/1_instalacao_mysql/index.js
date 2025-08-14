const  express = require('express')
const {engine} = require('express-handlebars')
const mysql = require('mysql2')
const { dbPassword } = require('./config')
const port = 3000

const app = express()

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('home')
})

const con = mysql.createConnection({
    host: 'localhost',
    user:'root',
    password:dbPassword ,
    database:'nodemysql',
})

app.listen(3000, ()=> {
    console.log(`APP rodando na porta ${port}`)   
})

con.connect(function(err) {
    if(err) {
        console.log(err)
    }

    console.log('Conectou ao MYSQL')
})