const express = require('express'),
    router = express.Router(),
    db = require('../../helpers/db'),
    checkAdmin = require('../../middleware/checkAdmin');

/**
 * get all feedbacks
 */
router.get('/', checkAdmin, function (req, res) {
    db.query('SELECT * FROM feedbacks ORDER BY date desc', function (err, rows, fields) {
        if (err) throw err;

        res.send(rows);
    });
});

/**
 * get feedback by id
 */
router.get('/:id', checkAdmin, function (req, res) {
    db.query('SELECT * FROM feedbacks WHERE id = ?', [req.params.id] , function (err, rows, fields) {
        if (err) throw err;

        res.send(rows[0]);
    });
});

/**
 * delete feedback by id
 */
router.delete('/:id', checkAdmin, function (req, res) { //delete feedback by id
    db.query('DELETE  FROM feedbacks WHERE id = ?', [req.params.id] , function (err, rows, fields) {
        if (err) throw err;

        res.send(true);
    });
});

/**
 * insert new feedback
 */
router.post('/add', function (req, res) {
    if(req.session.captcha == req.body.captha) {
        var feedback = {};

        feedback.date = new Date();
        feedback.name = req.body.name;
        feedback.email = req.body.email;
        feedback.feedback = req.body.feedback;

        db.query('INSERT INTO feedbacks SET ?', [feedback], function (err, result) {
            if (err) throw err;

            res.send(req.body);
        });
    } else {
        res.send({error: 'Вы неверно ввели символы'});
    }

});

module.exports = router;