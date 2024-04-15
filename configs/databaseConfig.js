const mysql = require('mysql')
const dotenv = require('dotenv')



dotenv.config({
    path: './.env'
})


const data_base = mysql.createConnection({
    host: 'sql11.freemysqlhosting.net',
    user: 'sql11699246',
    password:'quUshF9aQv',
    database: 'sql11699246',
    port:3306
})


module.exports =  data_base