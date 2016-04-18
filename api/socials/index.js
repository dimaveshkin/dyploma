const express = require('express'),
    router = express.Router(),
    db = require('../../helpers/db');

router.get('/', function (req, res) { //get all socials
    db.query('SELECT * FROM contacts', function (err, rows, fields) {
        if (err) throw err;

        res.send(rows);
    });
});


module.exports = router;