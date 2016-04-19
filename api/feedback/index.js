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
    if(req.session.captcha == req.body.captha) {
        var feedback = {};

        feedback.date = new Date();
        feedback.name = req.body.name;
        feedback.email = req.body.email;
        feedback.feedback = req.body.feedback;

        db.query('INSERT INTO feedbacks SET ?',feedback, function (err, result) {
            if (err) throw err;

            res.send(req.body);
        });
    } else {
        res.send({error: 'Вы неверно ввели символы'});
    }


});

module.exports = router;