const readline = require("readline").createInterface({
    input: process.stdin,
    output:process.stdout,
})

readline.question("Qual a sua linguagem preferida?" , (language) => {
if(language.toLowerCase() === 'python'){
    console.log('Isso nem é linguagem')
}else{
console.log(`a minha linguagem preferida é: ${language}`)
}

readline.close()
})