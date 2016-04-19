const express = require('express'),
    router = express.Router(),
    db = require('../../helpers/db'),
    imgPath = require('../../helpers/imgPath'),
    transliteration = require('transliteration.cyr');


router.get('/countries', function (req, res) {//countries list
    db.query('SELECT * FROM countries', function (err, rows, fields) {
        if (err) throw err;

        res.send(imgPath(rows, 'cover'));
    });
});

router.post('/countries/add', function (req, res) {//add new empty country
    var post = {
        name: "Киев",
        international: transliteration.transliterate('Киев'),
        cover: ""
    };

    db.query('INSERT INTO countries SET ?', post, function (err, result) {
        res.send('ok');
    });
});

router.get('/best', function (req, res) {//best
    db.query('SELECT id, src, title, p.desc FROM photos as p where is_best = true', function (err, rows, fields) {
        if (err) throw err;

        res.send(imgPath(rows));
    });
});

router.get('/best/add/:id', function (req, res) {//add to best
    db.query('UPDATE photos SET is_best = 1 WHERE id = ? ', [req.params.id],
        function (err, result) {
            if (err) throw err;
            res.send('ok');
        });
});

router.get('/best/remove/:id', function (req, res) {//remove from best
    db.query('UPDATE photos SET is_best = 0 WHERE id = ?', [req.params.id],
        function (err, result) {
            if (err) throw err;
            res.send('ok');
        });
});

router.get('/all', function (req, res) { //all
    db.query('SELECT id, src, title, p.desc FROM photos as p', function (err, rows, fields) {
        if (err) throw err;

        res.send(imgPath(rows));
    });
});

router.get('/country/:location', function (req, res) { //by country
    db.query('SELECT p.id, src, title, p.desc, name FROM photos as p, countries as c WHERE c.international ="' + req.params.location + '" AND p.country_id = c.id', function (err, rows, fields) {
        if (err) throw err;
        res.send(imgPath(rows));
    });
});

router.get('/getGallery', function (req, res) { //get all galery(all+best+countries)

    var gallery = {};

    executeQuery('SELECT id, src, title, p.desc FROM photos as p')
        .then(function (img) {
            gallery.all = img;
            return executeQuery('SELECT id, src, title, p.desc FROM photos as p where is_best = true');
        })
        .then(function (img) {
            gallery.best = img;
            return executeQuery('SELECT * FROM countries', 'cover');
        })
        .then(function (list) {
            gallery.counties = list;
            res.send(gallery);
        });
});

function executeQuery(query, path) {
    return new Promise(function (resolve, reject) {
        db.query(query, function (err, rows, fields) {
            if (err) reject(new Error(err));

            resolve(imgPath(rows, path));
        });
    });
}

module.exports = router;