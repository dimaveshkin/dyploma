const express = require('express'),
    router = express.Router(),
    db = require('../../helpers/db'),
    checkAdmin = require('../../middleware/checkAdmin'),
    cryptPassword = require('../../helpers/cryptPassword');

/**
 * change password for admin
 */
router.post('/change', checkAdmin, function (req, res) {
    compare(req.session.login, function (err, rows, fields) {
        if (rows && rows[0].password == cryptPassword(req.body.oldPassword)) {
            db.query('UPDATE users SET ? WHERE id = ' + db.escape(req.session.userId), [
                    {password: cryptPassword(req.body.password)}
                ],
                function (err, result) {
                    if (err) throw err;

                    res.send(true);
                });
        } else {
            res.send({code: 500, error: 'Пароль не верный'})
        }
    });
});

/**
 * add new admin user
 */
router.post('/add', checkAdmin, function (req, res) {
    db.query('INSERT INTO users SET ?', [{
        login: req.body.login,
        password: cryptPassword(req.body.password)}],
        function (err, result) {
            if (err) {
                res.send({code: 500, message: err.message});
                return;
            }

            res.send({code: 200, message: "Пользователь добавлен."});
        });
});

/**
 * check login/password is correct
 */
router.post('/login', function (req, res) {
    console.log(req.body.captcha);
    console.log(req.session.captcha);
    if (req.session.captcha == req.body.captcha) {
        compare(req.body.login, function (err, rows, fields) {
            if (rows.length) {
                if (rows[0].password == cryptPassword(req.body.password)) {
                    req.session.userId = rows[0].id;
                    req.session.admin = true;
                    req.session.login = req.body.login;
                    res.json({code: 200, message: "Success"});
                } else {
                    res.json({code: 403, message: "Логин или пароль введены неправильно!"});
                }
            } else {
                res.json({code: 403, message: "Логин или пароль введены неправильно!"});
            }
        });
    }
    else {
        res.json({code: 403, message: "Введенные символы не совпадают с символами в изображении!"});
    }
});

/**
 * logout form admin panel
 */
router.use('/logout', function (req, res, next) {//compare password
    req.session.destroy();
    res.redirect("/admin");
});

/**
 * check existing input login in DB
 * @param login
 * @param cb
 */
function compare(login, cb) {
    db.query('SELECT * FROM users WHERE users.login = ?', [login], cb);
}
module.exports = router;




