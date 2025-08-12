// 1. Imports (sempre no topo)
const express = require('express')
const {engine} = require('express-handlebars')
const app = express()
const port = 5000

// 2. Configurações do App (engine, view, static)
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.use(express.static('public'))

// Nosso "banco de dados" de produtos
const nossoEstoque = {
    bikes: [
    { id: 1, nome: 'Bicicleta Caloi Aro 29', preco: 'R$ 1.200,00' },
    { id: 2, nome: 'Bicicleta Sense Fun Evo', preco: 'R$ 2.800,00' }
    ],
    motos: [
    { id: 1, nome: 'Honda CB 300F', preco: 'R$ 23.000,00' },
    { id: 2, nome: 'Yamaha FZ25 Fazer', preco: 'R$ 22.190,00' }
    ],
    carros: [
    { id: 1, nome: 'Fiat Cronos', preco: 'R$ 93.990,00' },
    { id: 2, nome: 'Chevrolet Onix Plus', preco: 'R$ 97.390,00' }
    ],
    avioes: [
    { id: 1, nome: 'Cessna 172 Skyhawk', preco: 'RS$ 2.477.000' },
    { id: 2, nome: 'Embraer Phenom 300E', preco: 'RS$ 60.950.000' }
    ]
};

// 4. Rotas (app.get)
app.get('/', (req, res) => {
    const produtosHome = [
    ...nossoEstoque.carros, 
    ...nossoEstoque.motos, 
    ...nossoEstoque.bikes, 
    ...nossoEstoque.avioes
    ];
    res.render('home', {produtos: produtosHome})
})

app.get('/bikes', (req, res) =>     
    res.render('bikes', {produtos: nossoEstoque.bikes})
)

app.get('/motos', (req, res) => 
    res.render('motos', {produtos: nossoEstoque.motos}) 
)

app.get('/carros', (req, res) => 
    res.render('carros', {produtos: nossoEstoque.carros}) 
)

app.get('/avioes', (req, res) => 
    res.render('avioes', {produtos: nossoEstoque.avioes}) 
)

// 5. Iniciar o Servidor (sempre no final)
app.listen(5000, ()=>{
    console.log(`O app está funcionando na porta ${port}`)
})