import inquirer from 'inquirer'           // Importa o módulo para entrada de dados no terminal
import chalk from 'chalk'                 // Importa o módulo para estilizar texto no terminal
import fs from 'fs'                       // Importa o módulo para manipulação de arquivos
import { exit } from 'process'

operation()                               // Chama a função principal para iniciar o programa

function operation() {
  inquirer.prompt([                       // Exibe perguntas no terminal
    {
      type: 'list',                       // Tipo da pergunta: lista de opções
      name: 'action',                     // Nome do campo que será salvo na resposta
    message: 'O que você deseja fazer?',// Mensagem da pergunta
      choices: [                          // Opções disponíveis no menu
        'Criar conta',
        'Consultar Saldo',
        'Depositar',
        'Sacar',
        'Sair',
    ],
    },
])
  .then((answers) => {                    // Recebe a resposta do usuário
    const action = answers['action']      // Armazena a opção escolhida

    if (action === 'Criar conta') {       // Se a escolha for "Criar conta"
      createAccount()                     // Chama a função que inicia o processo de criação
    }else if(action === 'Depositar'){     // Se a escolha for "Depositar"
      deposit()
    }else if(action === 'Consultar Saldo'){     // Se a escolha for "Consultar saldo"
      consult()
    }else if(action === 'Sacar'){      // Se a escolha for "Sacar"
      sacar()
    }else if(action === 'Sair'){       // Se a escolha for "Sair"
      console.log(chalk.bgBlue.black('Obrigado por usar o Acoounts'))
      process.exit()
    }    
})
  .catch((err) => console.log(err))       // Mostra erros no terminal se algo der errado
}

function createAccount() {
  console.log(chalk.bgGreen.black('Parabéns por escolher o nosso banco!')) // Mensagem de boas-vindas
  console.log(chalk.green('Defina as opções da sua conta a seguir'))       // Orienta o usuário
  buildAccount()                                                            // Chama a função para criar a conta
}

function buildAccount() {
  inquirer.prompt([                              // Pergunta o nome da conta
    {
      name: 'accountname',                       // Nome do campo
      message: 'Digite um nome para a sua conta:', // Mensagem da pergunta
    },
])
.then((answers) => {
    const accountname = answers['accountname']   // Armazena o nome digitado
    console.info(accountname)                    // Exibe o nome da conta no terminal

    if (!fs.existsSync('accounts')) {            // Verifica se a pasta 'accounts' existe
      fs.mkdirSync('accounts')                   // Cria a pasta se não existir
    }

    if (fs.existsSync(`accounts/${accountname}.json`)) { // Verifica se já existe conta com o mesmo nome
      console.log(chalk.bgRed.black('Esta conta já existe, escolha outro nome.')) // Mensagem de erro
      buildAccount()                             // Tenta novamente
      return                                     // Encerra esta execução da função
    }

    fs.writeFileSync(`accounts/${accountname}.json`,  // Cria um arquivo JSON para a conta     // Caminho e nome do arquivo            
    '{"balance": 0}',                          // Conteúdo inicial (saldo 0)
    function (err) {                           // Função de callback caso ocorra erro
    console.log(err)                         // Mostra o erro
    }
    )

    console.log(chalk.green('Parabéns, sua conta foi criada!')) // Confirmação de criação
    operation()                                                  // Volta ao menu principal
})
  .catch((err) => console.log(err))               // Mostra erro caso algo falhe na criação
}