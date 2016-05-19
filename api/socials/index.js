const express = require('express'),
    router = express.Router(),
    checkAdmin = require('../../middleware/checkAdmin'),
    db = require('../../helpers/db');

/**
 * get  links to socials networks
 */
router.get('/', function (req, res) {
    db.query('SELECT * FROM contacts', function (err, rows, fields) {
        if (err) throw err;

        res.send(rows);
    });
});

/**
 * update links to socials networks
 */
router.put('/', checkAdmin, function (req, res) {
  db.query('UPDATE contacts SET ?',[req.body],
      function(err, result) {
        if (err) throw err;

        res.send(req.body);
      });
});

module.exports = router;