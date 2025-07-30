//moduloes externos
import inquirer from 'inquirer'//const inquirer = require('inquirer')
import chalk from 'chalk'

//modulos externos
import fs from 'fs'

    operation()

function operation() {
    inquirer.prompt([
        {
        type:'list',
        name:'action',
        message:'o que você deseja fazer?',
        choices:[
            'Criar conta',
            'Consultar Saldo',
            'Depositar',
            'Sacar',
            'Sair',
        ],
    }
])
.then((answers) => {
    const action = answers['action']
    console.log(action)
})
.catch((err) => console.log(err))
}