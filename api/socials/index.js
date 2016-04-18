const express = require('express'),
    router = express.Router(),
    db = require('../../helpers/db');

router.get('/', function (req, res) { //get all socials
    db.query('SELECT * FROM contacts', function (err, rows, fields) {
        if (err) throw err;

        res.send(rows);
    });
});

router.put('/', function (req, res) { //updates all socials
  db.query('UPDATE contacts SET ?',[{ vkontakte: "vk.com/1",instagram: "pics" }],
      function(err, result) {
        if (err) throw err;

        res.send('ok');
      });
});

module.exports = router;