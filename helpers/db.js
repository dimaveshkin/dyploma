var mysql = require('mysql');

/***
 * create connection with DB
 */
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'photographydb'
});

connection.connect();

module.exports = connection;