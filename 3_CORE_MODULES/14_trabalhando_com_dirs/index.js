const fs = require("fs")

if(!fs.existsSync('./minhapasta')){
    console.log('Não existe!')
    fs.mkdirSync("minhapasta")
}else{(fs.existsSync('./minhapasta'))
    console.log('existe!')
}



