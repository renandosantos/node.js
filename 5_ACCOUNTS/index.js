import inquirer from 'inquirer'           // Importa o módulo para entrada de dados no terminal
import chalk from 'chalk'                 // Importa o módulo para estilizar texto no terminal
import fs from 'fs'                       // Importa o módulo para manipulação de arquivos

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
      deposit()                           // Chama a função que inicia o processo de deposito
    }else if(action === 'Consultar Saldo'){     // Se a escolha for "Consultar saldo"
      consult()                           // Chama a função que inicia o processo de consulta de saldo
    }else if(action === 'Sacar'){      // Se a escolha for "Sacar"
      sacar()                           // Chama a função que inicia o processo de sacar
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

//add an amount to user account
function deposit() {

  inquirer.prompt([                     // Pergunta o nome da conta
    {
      name: 'accountname',                 //nome do campo
      message: 'Qual o nome da sua conta?'   // Mensagem da pergunta
    }
  ]).then((answers) => {

    const accountname = answers['accountname']
    
    //verificar se a conta existe
    if(!checkaccount(accountname)){
      return deposit()
    }
    inquirer.prompt([
    {
      name: 'amount',
      message: 'Quanto você deseja depositar?',
    },
    ]).then((answers) => {

      const amount = answers['amount']

      //add an amount
      addamount(accountname, amount)
      operation()
    })
    .catch(err => console.log(err))
  })
  .catch(err => console.log(err))
}


function checkaccount(accountname){
  if(!fs.existsSync(`accounts/${accountname}.json`)) {
    console.log(chalk.bgRed.black('Esta conta não existe, escolha outro nome!'))
    return false
}
return true
}

function addamount(accountname, amount) {
  const accountdata = getaccount(accountname)
  if(!amount) {
    console.log(chalk.bgRed.black('Ocorreu um erro, tente novamente mais tarde!'))
    return deposit()
  }
  accountdata.balance = parseFloat(amount) + parseFloat(accountdata.balance)

  fs.writeFileSync(
  `accounts/${accountname}.json`,
  JSON.stringify(accountdata),
  function(err) {
    console.log(err)
  },
)
  console.log(chalk.green(`Foi depositado o valor de R$${amount} na sua conta`),
)
}

//função sacar
function subamount(accountname, amount) {
  const accountdata = getaccount(accountname)
  if(!amount) {
    console.log(chalk.bgRed.black('Ocorreu um erro, tente novamente mais tarde!'))
    return sacar()
  }if(parseFloat(amount) <= parseFloat(accountdata.balance)){
    accountdata.balance = parseFloat(accountdata.balance) - parseFloat(amount) 
  
  
  fs.writeFileSync(
  `accounts/${accountname}.json`,
  JSON.stringify(accountdata),
  function(err) {
    console.log(err)
  },
)
  console.log(chalk.green(`Saque de R$${amount} foi realizado com sucesso`),
)
}else{
  console.log('Saldo insuficiente!')
}
}


function getaccount(accountname) {
  const accountJSON = fs.readFileSync(`accounts/${accountname}.json`, {
    encoding: 'utf8',
    flag: 'r'
    
  })
  return JSON.parse(accountJSON)
}

//ver saldo
function consult() {
  inquirer.prompt([
    {
      name:'accountname',
      message: 'Qual o nome da sua conta?'
    }
  ]).then((answers) => {
    const accountname = answers["accountname"]
      if(!checkaccount(accountname)){
      return consult()
    }

    const accountdata = getaccount(accountname)
    console.log(chalk.bgBlue.black(
      `Olá ${accountname}, o saldo da sua conta é de R$${accountdata.balance}`,
    ),
  )
  operation()
  }).catch(err => console.log(err))
}

//sacar

function sacar() {

  inquirer.prompt([                     // Pergunta o nome da conta
    {
      name: 'accountname',                 //nome do campo
      message: 'Qual o nome da sua conta?'   // Mensagem da pergunta
    }
  ]).then((answers) => {

    const accountname = answers['accountname']
    
    //verificar se a conta existe
    if(!checkaccount(accountname)){
      return sacar()
    }
    inquirer.prompt([
    {
      name: 'amount',
      message: 'Quanto você deseja sacar?',
    },
    ]).then((answers) => {

      const amount = answers['amount']

      //add an amount
      subamount(accountname, amount)
      operation()
    })
    .catch(err => console.log(err))
  })
  .catch(err => console.log(err))
}