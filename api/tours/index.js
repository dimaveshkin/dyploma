const express = require('express'),
    router = express.Router(),
    imgPath = require('../../helpers/imgPath'),
    db = require('../../helpers/db'),
    TOURS_SOURCE = "/images/tours/";

router.get('/', function (req, res) { //get tours list
    db.query('SELECT id, title, t.desc, startDate, endDate, latitude, longitude, cover  FROM tours as t', function (err, rows, fields) {
        if (err) throw err;

        res.send(imgPath.concatPath(rows, 'cover', TOURS_SOURCE));
    });
});

router.get('/:id', function (req, res) { //get tour by id
  db.query('SELECT *  FROM tours WHERE id=' + req.params.id, function (err, rows, fields) {
    if (err) throw err;

      rows[0].schedule = JSON.parse(rows[0].schedule);
      rows[0].not_inclusive = JSON.parse(rows[0].not_inclusive);
      rows[0].inclusive = JSON.parse(rows[0].inclusive);
    res.send(imgPath.JSONPath(rows, 'img'));
  });
});

module.exports = router;




