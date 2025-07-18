const chalk = require("chalk")
const nota = 7

if(nota >= 7) {
    console.log(chalk.green.bold('Parabens! Você foi aprovado'))
}else{
    console.log(chalk.red.bold('Burro! Você foi reprovado'))
}