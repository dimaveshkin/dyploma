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
  console.log(req.body);

  var post  = {
    name: "Дмитрий",
    email: "dmytro_sopin@epam.com",
    feedback: "Cool design!",
    date: new Date()
  };

  db.query('INSERT INTO feedbacks SET ?', post, function(err, result) {
    res.send('ok');
  });
});

module.exports = router;