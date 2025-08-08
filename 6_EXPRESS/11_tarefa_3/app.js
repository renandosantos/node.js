const express = require("express")
const path = require('path')
const app = express()
const xxx = path.join(__dirname, "paginas")
const port = 5000

app.get("/", (req, res) =>{
    res.sendFile(`${xxx}/inicial.html`)
})

app.get('/contatos', (req, res) =>{
    res.sendFile(`${xxx}/contatos.html`)
})

app.get('/404', (req, res) =>{
    res.sendFile(`${xxx}/error.html`)
})

app.listen(port, () => {
    console.log(`Porta ${port} funcionando`)
})