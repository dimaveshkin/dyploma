const express = require('express'),
      router = express.Router(),
      db = require('../../helpers/db');

router.get('/countries', function (req, res) {//countries list
    db.query('SELECT * FROM countries', function (err, rows, fields) {
        if (err) throw err;

        res.send(rows);
    });
});

router.get('/best', function (req, res) {//best
    db.query('SELECT id, src, title, p.desc FROM photos as p where is_best = true', function (err, rows, fields) {
        if (err) throw err;

        res.send(rows);
    });
});

router.get('/all', function (req, res) { //all
    db.query('SELECT id, src, title, p.desc FROM photos as p', function (err, rows, fields) {
        if (err) throw err;

        res.send(rows);
    });
});

router.get('/country/:location', function (req, res) { //by country
    db.query('SELECT p.id, src, title, p.desc, name FROM photos as p, countries as c WHERE c.international ="' + req.params.location + '" AND p.country_id = c.id', function (err, rows, fields) {
        if (err) throw err;

        res.send(rows);
    });
});


module.exports = router;