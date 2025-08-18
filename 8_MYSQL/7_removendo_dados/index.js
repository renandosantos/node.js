const express = require('express') // Importa o framework Express
const {engine} = require('express-handlebars') // Importa o motor de template Handlebars
const mysql = require('mysql2') // Importa o driver MySQL para Node.js
const { dbPassword } = require('./config') // Importa a senha do banco de dados
const port = 3000 // Define a porta do servidor

const app = express() // Inicializa o aplicativo Express

app.use( // Permite o processamento de dados de formulários
    express.urlencoded({
        extended: true // Habilita o parsing de objetos aninhados
    })
)

app.use(express.json()) // Permite o processamento de dados no formato JSON

app.engine('handlebars', engine()) // Configura o Handlebars como motor de template
app.set('view engine', 'handlebars') // Define a engine de visualização

app.use(express.static('public')) // Serve arquivos estáticos da pasta 'public'

app.get('/', (req, res) => { // Define a rota principal
    res.render('home') // Renderiza a view 'home.handlebars'
})

app.post('/books/insertbook', (req, res) => { // Define a rota POST para inserir um livro
    const tittle = req.body.tittle // Pega o título do corpo da requisição
    const pageqty = req.body.pageqty // Pega a quantidade de páginas do corpo da requisição

    const sql = `INSERT INTO books (tittle, pageqty) VALUES('${tittle}', '${pageqty}')` // Cria a query SQL

    con.query(sql, function(err){ // Executa a query
        if(err) { // Se houver erro
        console.log(err) // Exibe o erro
        return // Retorna para parar a execução
    }
        res.redirect('/books') // Redireciona para a página de livros
    })
})

app.get('/books', (req, res) =>{ // Define a rota para listar os livros
    const sql = "SELECT * FROM books" // Query para selecionar todos os livros

    con.query(sql, function(err, data) { // Executa a query
        if(err) { // Se houver erro
        console.log(err) // Exibe o erro
        return // Retorna para parar a execução
    }

        const books = data // Armazena os dados dos livros

        console.log(books) // Exibe os dados no console

        res.render('books', { books }) // Renderiza a view 'books' com os dados
    })
})

app.get('/books/:id', (req, res) => { // Define a rota para um livro específico
    const id = req.params.id // Pega o ID da URL

    const sql = `SELECT * FROM books where id = ${id}` // Query para buscar o livro pelo ID

    con.query(sql, function(err, data) { // Executa a query
        if(err) { // Se houver erro
        console.log(err) // Exibe o erro
        return // Retorna para parar a execução
    }
    const book = data[0] // Pega o primeiro (e único) resultado
    res.render('book', { book }) // Renderiza a view 'book' com os dados
    })
})

app.get('/books/edit/:id', (req, res) => { // Define a rota para editar um livro
    const id = req.params.id // Pega o ID da URL

    const sql = `SELECT *FROM books where id = ${id}` // Query para buscar o livro a ser editado

    con.query(sql, function(err, data) { // Executa a query
        if(err) { // Se houver erro
        console.log(err) // Exibe o erro
        return // Retorna para parar a execução
    }
    const book = data[0] // Pega o primeiro (e único) resultado
    res.render('editbook', { book }) // Renderiza a view de edição
    })
})

app.post('/books/updatebook', (req, res) =>{ // Define a rota POST para atualizar um livro
    const id = req.body.id // Pega o ID do corpo da requisição
    const tittle = req.body.tittle // Pega o novo título
    const pageqty = req.body.pageqty // Pega a nova quantidade de páginas
    const sql = `UPDATE books SET tittle = '${tittle}', pageqty = '${pageqty}' WHERE id = ${id}` // Query de atualização
    con.query(sql, function(err){ // Executa a query
        if(err) { // Se houver erro
        console.log(err) // Exibe o erro
        return // Retorna para parar a execução
    }
        res.redirect('/books') // Redireciona para a página de livros
    })
})

app.post('/books/remove/:id', (req, res) => { // Define a rota POST para remover um livro
    const id = req.params.id // Pega o ID da URL
    const sql = `DELETE FROM books WHERE id = ${id}` // Query para deletar o livro
    con.query(sql, function(err) { // Executa a query
        if(err) { // Se houver erro
        console.log(err) // Exibe o erro
        return // Retorna para parar a execução
        }
        res.redirect('/books') // Redireciona para a página de livros
    })
})

const con = mysql.createConnection({ // Cria a conexão com o banco de dados
    host: 'localhost', // Servidor local
    user:'root', // Usuário padrão
    password:dbPassword , // Senha do arquivo de configuração
    database:'nodemysql', // Nome do banco de dados
})

con.connect(function(err) { // Estabelece a conexão
    if(err) { // Se houver erro
        console.log(err) // Exibe o erro
    }

    console.log('Conectou ao MYSQL') // Mensagem de sucesso
})

app.listen(3000, ()=> { // Inicia o servidor na porta 3000
    console.log(`APP rodando na porta ${port}`)     // Exibe a mensagem de sucesso
})