const fs = require("fs")
fs.stat("novoarquivo.txt",(err, stats) =>{
    if(err){
        console.log(err)
        return
    }
    
})
