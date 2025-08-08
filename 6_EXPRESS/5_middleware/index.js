const express = require("express");
const path = require("path");
const app = express();
const port = 3000;
const basepath = path.join(__dirname, "templates");
const checkauth = function (req, res, next) {
  req.authstatus = true;
  if (req.authstatus) {
    console.log("Está logado, pode continuar");
  } else {
    console.log("Não está logado, faça o login para continuar");
  }
  next();
};
app.use(checkauth);

app.get("/", (req, res) => {
  res.sendFile(`${basepath}/index.html`);
});

app.listen(port, () => {
  console.log(`App rodando na porta ${port}`);
});
