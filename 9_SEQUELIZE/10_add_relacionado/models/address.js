const { DataTypes } = require('sequelize')

const db = require('../db/conn')

const user = require('./user')

const address = db.define('address', {

    street: {
        type: DataTypes.STRING,
        required: true
    },
    number: {
        type: DataTypes.STRING,
        required: true
    },
    city: {
        type: DataTypes.STRING,
        required: true
    },

})

address.belongsTo(user)

module.exports = address