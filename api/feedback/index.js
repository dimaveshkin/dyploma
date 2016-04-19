const express = require('express'),
    router = express.Router(),
    db = require('../../helpers/db'),
    bodyParser = require('body-parser');


router.get('/', function (req, res) { //get all feedabacks
    db.query('SELECT * FROM feedbacks', function (err, rows, fields) {
        if (err) throw err;

        res.send(rows);
    });
});

router.post('/add', function (req, res) { //insert new feedback
    req.body.date = new Date();

    db.query('INSERT INTO feedbacks SET ?', req.body, function (err, result) {
        if (err) throw err;

        res.send(req.body);
    });
});

module.exports = router;