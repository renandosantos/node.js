const express = require('express')
const {engine} = require('express-handlebars')
const app = express()
const port = 3000

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')

app.get('/dashboard', (req, res) => {
res.render('dashboard')
})

app.get('/', (req, res) => {
const user = {
    name:'renan',
    surname:'santos',
    age: 24
}
const palavra = 'teste' 
const auth = true

    res.render('home', {user: user , palavra, auth })
})

app.listen(3000, () => {
    console.log(`App funcionando na porta ${port}`)
})