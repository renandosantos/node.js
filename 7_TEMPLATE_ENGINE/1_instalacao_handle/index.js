const express = require('express')
const {engine} = require('express-handlebars')
const app = express()
const port = 3000

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')

app.get('/', (req, res) => {
    res.render('home', { layout: false })
})

app.listen(3000, () => {
    console.log(`App funcionando na porta ${port}`)
})