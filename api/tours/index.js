const express = require('express'),
    router = express.Router(),
    imgPath = require('../../helpers/imgPath'),
    db = require('../../helpers/db'),
    del = require('del'),
    TOURS_SOURCE = "/images/tours/",
    imgBuildDeletePath = "images/build/tours/";

router.get('/', function (req, res) { //get tours list
    db.query('SELECT id, title, t.desc, startDate, endDate, latitude, longitude, cover  FROM tours as t', function (err, rows, fields) {
        if (err) throw err;

        var obj = imgPath.concatPath(rows, 'cover', TOURS_SOURCE);
        res.send(obj);
    });
});

router.get('/prev', function (req, res) { //get tours list
    db.query('SELECT id, title, t.desc, startDate, endDate, latitude, longitude, cover  FROM tours as t WHERE startDate <= NOW()', function (err, rows, fields) {
        if (err) throw err;

        res.send(imgPath.concatPath(rows, 'cover', TOURS_SOURCE));
    });
});

router.get('/next', function (req, res) { //get tours list
    db.query('SELECT id, title, t.desc, startDate, endDate, latitude, longitude, cover  FROM tours as t WHERE startDate > NOW()', function (err, rows, fields) {
        if (err) throw err;

        res.send(imgPath.concatPath(rows, 'cover', TOURS_SOURCE));
    });
});

router.get('/:id', function (req, res) { //get tour by id
    db.query('SELECT *  FROM tours WHERE id=' + req.params.id, function (err, rows, fields) {
        var response = {};

        if (err) {
            response.code = 500;
            response.message = "Ошибка при поиске фототура!";
            res.send(response);
            return;
        }

        rows[0].schedule = JSON.parse(rows[0].schedule);
        rows[0].not_inclusive = JSON.parse(rows[0].not_inclusive);
        rows[0].inclusive = JSON.parse(rows[0].inclusive);
        rows[0].startDate = rows[0].startDate.toLocaleDateString("ru-RU");
        rows[0].endDate = rows[0].endDate.toLocaleDateString("ru-RU");

        response.data = imgPath.JSONPath(rows, 'img')[0];
        response.message = "Тур найден.";
        response.code = 200;
        res.send(response);
    });
});

router.get('/remove/:id', function (req, res) { //get tour by id
    db.query('SELECT img, cover FROM tours WHERE id = ' + req.params.id, function (err, rows, fields) {
        var imgDeleteArr = [], img, cover;

        if (err) {
            res.send({
                message: "Can't find such tour!",
                code: 500
            });
        }

        img = JSON.parse(rows[0].img);

        if (img.head) {
            img.head.forEach(function (imgName) {
                imgDeleteArr.push(imgName);
            });
        }

        if (img.center) {
            img.center.forEach(function (imgName) {
                imgDeleteArr.push(imgName);
            });
        }

        imgDeleteArr.push(rows[0].cover);

        res.send({
            message: "Deleted!",
            code: 200
        });

        db.query('DELETE FROM tours WHERE id = ' + req.params.id, function (err, rows, fields) {
            if (err) {
                res.send({
                    message: "Can't delete tour!",
                    code: 500
                });
            }
            imgDeleteArr = imgDeleteArr.map(function (imgName) {
                return imgBuildDeletePath + imgName;
            });

            del(imgDeleteArr).then(function (paths) {
                console.log("Deleted from tours: \n" + imgDeleteArr.join("\n"));

                res.send({
                    message: "Deleted!",
                    code: 200
                });
            });
        });
    });

});


router.post('/add', function (req, res) {//add new request
    var request = {};

    if (req.session.captcha == req.body.captha) {
        request.date = new Date();
        request.name = req.body.name;
        request.email = req.body.email;
        request.application = req.body.application;
        request.status = 1;
        request.tour_id = req.body.tour_id;

        db.query('INSERT INTO requests SET ?', request, function (err, result) {

            console.log(err);
            res.send(request);
        });
    } else {
        res.send({error: 'Вы неверно ввели символы'});
    }
});

module.exports = router;




