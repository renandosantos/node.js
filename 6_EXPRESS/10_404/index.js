const express = require("express");
const path = require("path");
const app = express();
const port = 3000;
const basepath = path.join(__dirname, "templates");
const usersrouter = require('./users')
app.use(
  express.urlencoded({
    extended: true,
  })
)

app.use(express.json())

//arquivos estaticos
app.use(express.static('public')) 

  app.use('/users', usersrouter)

app.get("/", (req, res) => {
  res.sendFile(`${basepath}/index.html`);
});

app.use(function(req, res, next){
  res.status(404).sendFile(`${basepath}/404.html`)
}) 


app.listen(port, () => {
  console.log(`App rodando na porta ${port}`);
});