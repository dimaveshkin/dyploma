const express = require('express'),
    router = express.Router(),
    imgPath = require('../../helpers/imgPath'),
    db = require('../../helpers/db');

router.get('/', function (req, res) { //get tours list
    db.query('SELECT id, title, t.desc, startDate, endDate, latitude, longitude, img  FROM tours as t', function (err, rows, fields) {
        if (err) throw err;

        res.send(imgPath.JSONPath(rows, 'img'));
    });
});

router.get('/:id', function (req, res) { //get tour by id
  db.query('SELECT *  FROM tours WHERE id=' + req.params.id, function (err, rows, fields) {
    if (err) throw err;

    res.send(imgPath.JSONPath(rows, 'img'));
  });
});

module.exports = router;