const express = require('express'),
    router = express.Router(),
    db = require('../../helpers/db'),
    checkAdmin = require('../../middleware/checkAdmin'),
    cryptPassword = require('../../helpers/cryptPassword');

router.post('/change', checkAdmin, function (req, res) {//change password
  compare(req.session.login, function (err, rows, fields) {
    if (rows && rows[0].password == cryptPassword(req.body.oldPassword)) {
      db.query('UPDATE users SET ?', [
            {password: cryptPassword(req.body.password)}
          ],
          function (err, result) {
            if (err) throw err;

            res.send(true);
          });
    } else {
      res.send({error: 'Пароль не верный'})
    }
  });

});

router.post('/login', function (req, res) {//compare password

//  if (req.session.captcha == req.body.captcha) {
    compare(req.body.login, function (err, rows, fields) {
      if (rows && rows[0].password == cryptPassword(req.body.password)) {
        req.session.userId = rows[0].id;
        req.session.admin = true;
        req.session.login = req.body.login;
        res.redirect('/admin');
      } else {
        res.redirect('/admin');
      }
    });
//  }
//  else {
//    res.send({error: 'Символы не совпадают'})
//  }
});

router.use('/logout', function (req, res, next) {//compare password
  req.session.destroy();
  res.redirect("/admin");
});


function compare(login, cb) {
  db.query('SELECT * FROM users WHERE users.login = "' + login + '"', cb);
}
module.exports = router;




