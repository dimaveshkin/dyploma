const express = require('express'),
    router = express.Router(),
    checkAdmin = require('../../middleware/checkAdmin'),
    db = require('../../helpers/db');

router.get('/', function (req, res) { //get all socials
    db.query('SELECT * FROM contacts', function (err, rows, fields) {
        if (err) throw err;

        res.send(rows);
    });
});

router.put('/', checkAdmin, function (req, res) { //updates all socials
  db.query('UPDATE contacts SET ?',[req.body],
      function(err, result) {
        if (err) throw err;

        res.send(req.body);
      });
});

module.exports = router;