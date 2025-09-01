const { Sequelize } = require('sequelize')
const { senha } = require('../config')
const sequelize = new Sequelize('toughts', 'root', senha, {
    host: 'localhost',
    dialect: 'mysql',
    timezone: '-03:00', 
    dialectOptions: {timezone: '-03:00'}
})

try{
    sequelize.authenticate()
    console.log('conectado com sucesso')
} catch(err) {
    console.log(`Não foi possivel conectar: ${err}`)
}

module.exports = sequelize