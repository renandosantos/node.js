import inquirer from 'inquirer'           // Importa o módulo 'inquirer' para fazer perguntas no terminal
import chalk from 'chalk'                 // Importa o módulo 'chalk' para estilizar textos no terminal (cores, fundo, etc.)
import fs from 'fs'                       // Importa o módulo 'fs' para manipular arquivos e diretórios

operation()                               // Chama a função principal do programa para exibir o menu de opções

function operation() {                    // Função principal que exibe o menu e direciona para outras funções
  inquirer.prompt([                       // Usa o inquirer para mostrar uma pergunta ao usuário
    {
      type: 'list',                       // Tipo da pergunta: uma lista de opções
      name: 'action',                     // Nome da resposta (chave no objeto retornado)
      message: 'O que você deseja fazer?',// Texto que aparece no terminal
      choices: [                          // Lista de opções que o usuário pode escolher
        'Criar conta',                    // Opção 1
        'Consultar Saldo',                // Opção 2
        'Depositar',                      // Opção 3
        'Sacar',                          // Opção 4
        'Sair',                           // Opção 5
      ],
    },
  ])
  .then((answers) => {                    // Quando o usuário responde, executa este bloco
    const action = answers['action']      // Pega a opção escolhida pelo usuário

    if (action === 'Criar conta') {       // Se o usuário escolheu "Criar conta"
      createAccount()                     // Chama a função para iniciar a criação da conta
    } else if (action === 'Depositar') {  // Se o usuário escolheu "Depositar"
      deposit()                           // Chama a função de depósito
    } else if (action === 'Consultar Saldo') { // Se o usuário escolheu "Consultar Saldo"
      consult()                           // Chama a função de consulta de saldo
    } else if (action === 'Sacar') {      // Se o usuário escolheu "Sacar"
      sacar()                             // Chama a função de saque
    } else if (action === 'Sair') {       // Se o usuário escolheu "Sair"
      console.log(chalk.bgBlue.black('Obrigado por usar o Acoounts')) // Mostra mensagem de despedida estilizada
      process.exit()                      // Encerra a aplicação
    }
  })
  .catch((err) => console.log(err))       // Se houver erro ao mostrar o menu, exibe no terminal
}

function createAccount() {                                  // Função que mostra a introdução da criação de conta
  console.log(chalk.bgGreen.black('Parabéns por escolher o nosso banco!')) // Mensagem de boas-vindas com cor
  console.log(chalk.green('Defina as opções da sua conta a seguir'))       // Mensagem de instrução ao usuário
  buildAccount()                                             // Chama a próxima função que cria a conta
}

function buildAccount() {                                    // Função que efetivamente cria a conta
  inquirer.prompt([                                          // Pergunta ao usuário o nome da conta
    {
      name: 'accountname',                                   // Nome do campo da resposta
      message: 'Digite um nome para a sua conta:',           // Mensagem que aparece no terminal
    },
  ])
  .then((answers) => {                                       // Quando o usuário responde
    const accountname = answers['accountname']               // Armazena o nome da conta informado pelo usuário
    console.info(accountname)                                // Exibe no console o nome informado (debug)

    if (!fs.existsSync('accounts')) {                        // Verifica se a pasta "accounts" já existe
      fs.mkdirSync('accounts')                               // Se não existir, cria a pasta
    }

    if (fs.existsSync(`accounts/${accountname}.json`)) {     // Verifica se já existe uma conta com o mesmo nome
      console.log(chalk.bgRed.black('Esta conta já existe, escolha outro nome.')) // Alerta de erro
      buildAccount()                                         // Chama novamente a função para tentar de novo
      return                                                 // Encerra essa execução da função
    }

    fs.writeFileSync(                                        // Cria o arquivo da conta no sistema de arquivos
      `accounts/${accountname}.json`,                        // Caminho e nome do arquivo
      '{"balance": 0}',                                      // Conteúdo inicial do arquivo: saldo 0
      function (err) {                                       // Callback para caso ocorra erro
        console.log(err)                                     // Exibe o erro, se houver
      }
    )

    console.log(chalk.green(`Parabéns ${accountname}, sua conta foi criada!`)) // Confirmação da criação da conta
    operation()                                              // Retorna ao menu principal
  })
  .catch((err) => console.log(err))                          // Caso ocorra erro na criação, exibe no terminal
}

function deposit() {                                         // Função para iniciar o processo de depósito
  inquirer.prompt([                                          // Pergunta o nome da conta
    {
      name: 'accountname',                                   // Nome do campo
      message: 'Qual o nome da sua conta?'                   // Mensagem no terminal
    }
  ])
  .then((answers) => {                                       // Quando o usuário responde
    const accountname = answers['accountname']               // Armazena o nome da conta

    if (!checkaccount(accountname)) {                        // Verifica se a conta existe
      return deposit()                                       // Se não existir, reinicia o processo
    }

    inquirer.prompt([                                        // Pergunta o valor a ser depositado
      {
        name: 'amount',                                      // Nome do campo
        message: 'Quanto você deseja depositar?',            // Mensagem no terminal
      },
    ])
    .then((answers) => {                                     // Quando o usuário responde
      const amount = answers['amount']                       // Armazena o valor digitado
      addamount(accountname, amount)                         // Chama a função que deposita o valor
      operation()                                            // Retorna ao menu principal
    })
    .catch(err => console.log(err))                          // Exibe erro, se houver, na etapa do valor
  })
  .catch(err => console.log(err))                            // Exibe erro, se houver, na etapa do nome da conta
}

function checkaccount(accountname) {                         // Função que verifica se a conta existe
  if (!fs.existsSync(`accounts/${accountname}.json`)) {      // Verifica se o arquivo da conta existe
    console.log(chalk.bgRed.black('Esta conta não existe, escolha outro nome!')) // Alerta de erro
    return false                                             // Retorna falso se não existir
  }
  return true                                                // Retorna verdadeiro se a conta existir
}

function addamount(accountname, amount) {                    // Função para somar valor ao saldo da conta
  const accountdata = getaccount(accountname)                // Obtém os dados da conta

  if (!amount) {                                             // Se o valor for inválido
    console.log(chalk.bgRed.black('Ocorreu um erro, tente novamente mais tarde!')) // Alerta
    return deposit()                                         // Reinicia processo de depósito
  }

  accountdata.balance = parseFloat(amount) + parseFloat(accountdata.balance) // Soma o valor ao saldo atual

  fs.writeFileSync(                                          // Grava os dados atualizados no arquivo
    `accounts/${accountname}.json`,                          // Caminho do arquivo
    JSON.stringify(accountdata),                             // Transforma os dados em string JSON
    function(err) {                                          // Callback de erro
      console.log(err)                                       // Exibe o erro, se houver
    },
  )

  console.log(chalk.green(`Foi depositado o valor de R$${amount} na sua conta`)) // Confirmação do depósito
}

function subamount(accountname, amount) {                    // Função que subtrai valor (saque)
  const accountdata = getaccount(accountname)                // Obtém os dados da conta

  if (!amount) {                                             // Verifica se valor é válido
    console.log(chalk.bgRed.black('Ocorreu um erro, tente novamente mais tarde!')) // Alerta
    return sacar()                                           // Reinicia processo de saque
  }

  if (parseFloat(amount) <= parseFloat(accountdata.balance)) { // Verifica se há saldo suficiente
    accountdata.balance = parseFloat(accountdata.balance) - parseFloat(amount) // Subtrai valor do saldo

    fs.writeFileSync(                                        // Grava os dados atualizados
      `accounts/${accountname}.json`,                        // Caminho do arquivo
      JSON.stringify(accountdata),                           // Dados convertidos para JSON
      function(err) {
        console.log(err)                                     // Exibe erro, se houver
      },
    )

    console.log(chalk.green(`Saque de R$${amount} foi realizado com sucesso`)) // Mensagem de sucesso
  } else {
    console.log('Saldo insuficiente!')                       // Mensagem de saldo insuficiente
  }
}

function getaccount(accountname) {                           // Função que lê e retorna os dados da conta
  const accountJSON = fs.readFileSync(                       // Lê o conteúdo do arquivo da conta
    `accounts/${accountname}.json`,                          // Caminho do arquivo
    {
      encoding: 'utf8',                                      // Codificação de leitura
      flag: 'r'                                              // Modo somente leitura
    }
  )
  return JSON.parse(accountJSON)                             // Converte o conteúdo JSON em objeto e retorna
}

function consult() {                                         // Função para consultar o saldo da conta
  inquirer.prompt([
    {
      name: 'accountname',                                   // Pergunta o nome da conta
      message: 'Qual o nome da sua conta?'
    }
  ])
  .then((answers) => {
    const accountname = answers["accountname"]               // Armazena o nome digitado

    if (!checkaccount(accountname)) {                        // Verifica se a conta existe
      return consult()                                       // Se não existir, reinicia o processo
    }

    const accountdata = getaccount(accountname)              // Obtém dados da conta
    console.log(chalk.bgBlue.black(                          // Exibe o saldo com fundo azul
      `Olá ${accountname}, o saldo da sua conta é de R$${accountdata.balance}`,
    ))
    operation()                                              // Volta ao menu principal
  })
  .catch(err => console.log(err))                            // Exibe erro, se houver
}

function sacar() {                                           // Função para sacar valor da conta
  inquirer.prompt([                                          // Pergunta o nome da conta
    {
      name: 'accountname',                                   
      message: 'Qual o nome da sua conta?'
    }
  ])
  .then((answers) => {
    const accountname = answers['accountname']               // Armazena o nome informado

    if (!checkaccount(accountname)) {                        // Verifica se a conta existe
      return sacar()                                         // Reinicia se não existir
    }

    inquirer.prompt([                                        // Pergunta o valor a ser sacado
      {
        name: 'amount',
        message: 'Quanto você deseja sacar?',
      },
    ])
    .then((answers) => {
      const amount = answers['amount']                       // Armazena o valor informado
      subamount(accountname, amount)                         // Chama a função para realizar o saque
      operation()                                            // Volta ao menu principal
    })
    .catch(err => console.log(err))                          // Exibe erro, se houver
  })
  .catch(err => console.log(err))                            // Exibe erro, se houver
}