const http = require("http")

const port = 3000 

const server = http.createServer((req, res) => {
    res.statusCode = 200
    res.setHeader('Contenty-Type', 'Text/html')
    res.end('<h1> Olá, este é meu primeiro server com HTML!</h1>')
})

server.listen(port, () => {
    console.log(`Servidor esta rodando na porta ${port}`)
})