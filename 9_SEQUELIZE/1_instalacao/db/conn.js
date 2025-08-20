const { Sequelize } = require('sequelize')
const { dbPassword } = require('../config')
const sequelize = new Sequelize('nodesequelize', 'root', dbPassword, {
    host: 'localhost',
    dialect: 'mysql'

})

try {
    sequelize.authenticate()
    console.log('Conectamos com sucesso com o Sequelize!')
    
} catch(err) {
    console.log('Não foi possivel conectar:', error)
}

module.exports = sequelize