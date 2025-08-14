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
        return
    }
        res.redirect('/books')
    })
})

app.get('/books', (req, res) =>{
    const sql = "SELECT * FROM books"

    con.query(sql, function(err, data) {
        if(err) {
        console.log(err)
        return
    }

        const books = data

        console.log(books)

        res.render('books', { books })
    })
})

app.get('/books/:id', (req, res) => {
    const id =  req.params.id

    const sql = `SELECT * FROM books where id = ${id}`

    con.query(sql, function(err, data) {
        if(err) {
        console.log(err)
        return
    }
    const book = data[0]
    res.render('book', { book })
    })
})

app.get('/books/edit/:id', (req, res) => {
    const id = req.params.id

    const sql = `SELECT *FROM books where id = ${id}`

    con.query(sql, function(err, data) {
        if(err) {
        console.log(err)
        return
    }
    const book = data[0]
    res.render('editbook', { book })
    })
})

app.post('/books/updatebook', (req, res) =>{
    const id = req.body.id
    const tittle = req.body.tittle
    const pageqty = req.body.pageqty
    const sql = `UPDATE books SET tittle = '${tittle}', pageqty = '${pageqty}' WHERE id = ${id}`
    con.query(sql, function(err){
         if(err) {
        console.log(err)
        return
    }
        res.redirect('/books')
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

