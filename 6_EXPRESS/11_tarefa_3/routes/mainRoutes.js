app.get("/", (req, res) =>{
    res.sendFile(`${xxx}/inicial.html`)
})

app.get('/contatos', (req, res) =>{
    res.sendFile(`${xxx}/contatos.html`)
})