const http = require("http")

const port = 3000 

const server = http.createServer((req, res) => {
    res.write('oi server')
    res.end()
})

server.listen(port, () => {
    console.log(`Servidor esta codando na porta ${port}`)
})