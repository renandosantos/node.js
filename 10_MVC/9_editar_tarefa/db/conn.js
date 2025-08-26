const { Sequelize } = require('sequelize')
const { senha } = require('../config')
const sequelize = new Sequelize('nodemvc', 'root', senha, {
    host: 'localhost',
    dialect: 'mysql',
    timezone: '-03:00', 
    dialectOptions: {timezone: '-03:00'}

})

try {
    sequelize.authenticate()
    console.log('Conectamos com sucesso com o MYsql!')
    
} catch(err) {
    console.log('Não foi possivel conectar:', error)
}

module.exports = sequelize