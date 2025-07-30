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
    if(action === 'Criar conta'){
        createaccount()
    }
})
.catch((err) => console.log(err))
}

//Criação a conta
function createaccount() {
    console.log(chalk.bgGreen.black('Parabéns por escolher o nosso banco!'))
    console.log(chalk.green('defina as opções da sua conta a seguir'))
    buildaccount()
}

function buildaccount() {

    inquirer.prompt([
        {
            name: 'accountname',
            message: 'Digite um nome para a sua conta:',
        },
    ])
    .then((answers) => {
        const accountname = answers['accountname']
        console.info(accountname)

        if(!fs.existsSync('accounts')){
            fs.mkdirSync('accounts')
        }

        if(fs.existsSync(`accounts/${accountname}.json`)) {
            console.log(chalk.bgRed.black('Esta conta ja existe, escolha outro nome!'),
            )
            buildaccount()
            return
        }

        fs.writeFileSync(`accounts/${accountname}.json`,
            '{"balance": 0}',
            function(err) {
            console.log(err)
            },
        )

        console.log(chalk.green('Parabéns, sua conta foi criada!'))
        operation()
    })
    .catch((err) => console.log(err))
}