const inquirer = require("inquirer")
const chalk = require("chalk")

inquirer
    .prompt([
        {name:'signo', message: 'Qual é seu signo?'},
        {name:'ano', message: 'Em que ano você nasceu?'},
    ])
.then((answers) => {
    const response = `A pessoa que tem o signo ${answers.signo} e nasceu no ano de ${answers.ano} foi feita para brilhar `
    console.log(`${response}`)
})