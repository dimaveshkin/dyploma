const express = require('express'),
    router = express.Router(),
    db = require('../../helpers/db'),
    cryptPassword = require('../../helpers/cryptPassword');

router.post('/change', function (req, res) {//change password
    if (compare(req.body.oldPassword)) {
        db.query('UPDATE users SET ?', [{password: cryptPassword(req.body.password)}],
            function (err, result) {
                if (err) throw err;

                res.send(true);
            });
    } else {
        res.send({error: 'Пароль не верный'})
    }
});

router.post('/login', function (req, res) {//compare password
    if(compare(req.body.password)){
        req.session.userId = user._id;
        req.session.admin = true;

        res.redirect('/admin');
    } else {
        res.send({error: 'Пароль не верный'})
    }
});


function compare(password) {
    return db.query('SELECT * FROM users', function (err, rows, fields) {
        if(rows[0].password == cryptPassword(password)) {
            return rows[0].id
        }
        return false;
    });
}
module.exports = router;




