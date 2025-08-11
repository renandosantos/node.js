const express = require("express")
const path = require('path')
const app = express()
const xxx = path.join(__dirname, "templates")
const port = 5000

app.use(express.static('public'));

app.get("/", (req, res) =>{
    res.sendFile(`${xxx}/inicial.html`)
})

app.get('/contatos', (req, res) =>{
    res.sendFile(`${xxx}/contatos.html`)
})

app.use(function(req, res, next){
    res.status(404).sendFile(`${xxx}/404.html`)
})

app.listen(port, () => {
    console.log(`Porta ${port} funcionando`)
})