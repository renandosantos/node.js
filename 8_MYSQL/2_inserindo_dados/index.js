const  express = require('express')
const {engine} = require('express-handlebars')
const mysql = require('mysql2')
const { dbPassword } = require('./config')
const port = 3000

const app = express()

app.use(
    express.urlencoded({
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

app.post('/books/insertbook', (req, res) => {
    const tittle = req.body.tittle
    const pageqty = req.body.pageqty

    const sql = `INSERT INTO books (tittle, pageqty) VALUES('${tittle}', '${pageqty}')`

    con.query(sql, function(err){
        if(err) {
        console.log(err)
    }
        res.redirect('/')
    })
})

const con = mysql.createConnection({
    host: 'localhost',
    user:'root',
    password:dbPassword ,
    database:'nodemysql',
})

con.connect(function(err) {
    if(err) {
        console.log(err)
    }

    console.log('Conectou ao MYSQL')
})

app.listen(3000, ()=> {
    console.log(`APP rodando na porta ${port}`)   
})

