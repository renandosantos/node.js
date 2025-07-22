const http = require("http")

const port = 3000 

const server = http.createServer((req, res) => {
const urlinfo = require('url').parse(req.url, true)
const name = urlinfo.query.name

    res.statusCode = 200
    res.setHeader('Contenty-Type', 'Text/html')

    if(!name) {
        res.end( '<h1> preencha o seu nome:</h1><form method="GET"><input type="text" name="name" /><input type="submit" value="enviar" ></form>')
    }else{
        res.end(`<h1>Seja bem vindo ${name}</h1>`)
    }
    
})

server.listen(port, () => {
    console.log(`Servidor esta rodando na porta ${port}`)
})