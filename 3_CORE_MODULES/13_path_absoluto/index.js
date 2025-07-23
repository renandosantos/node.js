const path = require('path')

//path absoluto
console.log(path.resolve('teste.txt'))

//formar path
const midfolder = "relatorios"
const filename = "renan.txt"
const finalpath = path.join('/', 'arquivos', midfolder, filename)

console.log(finalpath)