const mysql = require('mysql2')
const { dbPassword } = require('./config')
const pool = mysql.createPool({
    connectionLimit: 10 ,
    host: 'localhost',
    user: 'root',
    password: dbPassword,
    database: 'nodemysql',
})
module.exports = pool