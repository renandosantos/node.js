const { Sequelize } = require('sequelize')
const { dbPassword } = require('../config')
const sequelize = new Sequelize('nodesequelize', 'root', dbPassword, {
    host: 'localhost',
    dialect: 'mysql',
    timezone: '-03:00', 
    dialectOptions: {timezone: '-03:00'}

})

/*try {
    sequelize.authenticate()
    console.log('Conectamos com sucesso com o Sequelize!')
    
} catch(err) {
    console.log('Não foi possivel conectar:', error)
}*/

module.exports = sequelize