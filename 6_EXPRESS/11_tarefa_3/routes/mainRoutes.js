const express = require("express")
const path = require("path")
const xxx = path.join(__dirname, '..', "templates")
const router = express.Router()

router.get("/", (req, res) =>{
    res.sendFile(`${xxx}/inicial.html`)
})

router.get('/contatos', (req, res) =>{
    res.sendFile(`${xxx}/contatos.html`)
})

module.exports = router;