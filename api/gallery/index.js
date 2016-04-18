const express = require('express'),
    router = express.Router(),
    mysql = require('mysql');


var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'photographydb'
});

connection.connect();

router.get('/countries', function (req, res) {//countries list
    connection.query('SELECT * FROM countries', function (err, rows, fields) {
        if (err) throw err;

        res.send(rows);
    });
});

router.get('/best', function (req, res) {//best
    connection.query('SELECT id, src, title, p.desc FROM photos as p where is_best = true', function (err, rows, fields) {
        if (err) throw err;

        res.send(rows);
    });
});

router.get('/all', function (req, res) { //all
    connection.query('SELECT id, src, title, p.desc FROM photos as p', function (err, rows, fields) {
        if (err) throw err;

        res.send(rows);
    });
});

router.get('/country/:location', function (req, res) { //by country
    connection.query('SELECT p.id, src, title, p.desc, name FROM photos as p, countries as c WHERE p.country_id = 3 AND p.country_id = c.id', function (err, rows, fields) {
        if (err) throw err;

        res.send(rows);
    });
});


module.exports = router;