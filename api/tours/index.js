const express = require('express'),
    router = express.Router(),
    imgPath = require('../../helpers/imgPath'),
    db = require('../../helpers/db'),
    del = require('del'),
    checkAdmin = require('../../middleware/checkAdmin'),
    TOURS_SOURCE = "/images/tours/",
    imgBuildDeletePath = "images/build/tours/",
    multiparty = require('multiparty');

router.get('/', function (req, res) { //get tours list
    db.query('SELECT id, title, t.desc, startDate, endDate, latitude, longitude, cover  FROM tours as t', function (err, rows, fields) {
        if (err) throw err;

        var obj = imgPath.concatPath(rows, 'cover', TOURS_SOURCE);
        res.send(obj);
    });
});

router.post('/', checkAdmin, function (req, res) { //get tours list

    req.body.schedule = JSON.stringify(req.body.schedule);
    req.body.not_inclusive = JSON.stringify(req.body.not_inclusive);
    req.body.inclusive = JSON.stringify(req.body.inclusive);
    req.body.img = JSON.stringify(req.body.img);
    req.body.startDate = formatDateForDB(req.body.startDate);
    req.body.endDate = formatDateForDB(req.body.endDate);
    
    db.query('INSERT INTO tours SET ?', req.body, function (err, rows, fields) {
        if (err) {
            res.json({code: 500, message: "Не удалось сохранить фототур."});
            return;
        }

        res.json({code: 200, message: "Фототур сохранен."});
    });
});

router.get('/requests',checkAdmin, function (req, res) { //get tours list which have requests
    db.query('SELECT t.id, t.title, startDate, endDate, COUNT(r.id) as count, t.places FROM tours AS t INNER JOIN requests AS r ON r.tour_id = t.id GROUP BY t.title', function (err, rows, fields) {
        if (err) throw err;

        res.send(rows);
    });
});

router.get('/requests/:id',checkAdmin, function (req, res) { //get requests by tour id
    db.query('SELECT r.id, r.name, r.email, r.application, r.date, s.status FROM requests AS r, request_statuses AS s WHERE s.id = r.status AND tour_id = ' + db.escape(req.params.id) + ' ORDER BY(s.status) desc', function (err, rows, fields) {
        if (err) throw err;

        res.send(rows);
    });
});

router.post('/requests/accept/:id',checkAdmin, function (req, res) { //accept requests by id
    db.query('UPDATE requests SET ? WHERE id =' + req.params.id, {status: 2}, function(err, result) {
        if (err) {
            res.send({
                error: "Can't accept request",
                code: 500
            });
            throw err;
        }
        res.send({
            message: "Accepted",
            code: 200
        });
    });
});

router.post('/requests/reject/:id',checkAdmin, function (req, res) { //reject requests by id
    db.query('UPDATE requests SET ? WHERE id =' + req.params.id, {status: 3}, function(err, result) {
        if (err) {
            res.send({
                error: "Can't reject request",
                code: 500
            });
            throw err;
        }
        res.send({
            message: "Rejected",
            code: 200
        });
    });
});

router.post('/requests/delete/:id',checkAdmin, function (req, res) { //delete requests by id
    db.query('DELETE FROM requests WHERE id =' + req.params.id, function (err, rows) {
        if (err) {
            res.json({code: 500, error:"Nothing has been deleted!"});
            throw err;
        }
        res.json({code: 200, message:"Success!"});
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
        // rows[0].startDate = formatDate(rows[0].startDate, ".");
        // rows[0].endDate = formatDate(rows[0].endDate, ".");

        response.data = imgPath.JSONPath(rows, 'img')[0];
        imgPath.concatPath(rows, 'cover', '/images/tours/');
        response.message = "Тур найден.";
        response.code = 200;
        res.send(response);
    });
});

router.put('/:id',checkAdmin, function (req, res) {
router.post('/:id', function (req, res) {
    var form = new multiparty.Form({uploadDir: 'test'});
    form.parse(req, function(err, fields, files) {
        var data = {};

        if(!files) {
            data = JSON.parse(req.body.data);
        } else {
            data = JSON.parse(fields.data);
        }


        data.schedule = JSON.stringify(data.schedule);
        data.not_inclusive = JSON.stringify(data.not_inclusive);
        data.inclusive = JSON.stringify(data.inclusive);
        data.img = JSON.stringify(data.img);
        data.startDate = formatDateForDB(data.startDate);
        data.endDate = formatDateForDB(data.endDate);

        console.log(files.head.length);
        db.query('UPDATE tours AS t SET ? WHERE id = ' + req.params.id, data, function (err, result) {
            if (err) {
                res.json({code: 500, message:"Tour was not changed"});
            }
            res.json({code: 200, message:"Success!"})
        });
    });
    //res.send('ok');
    //
    //req.body.schedule = JSON.stringify(req.body.schedule);
    //req.body.not_inclusive = JSON.stringify(req.body.not_inclusive);
    //req.body.inclusive = JSON.stringify(req.body.inclusive);
    //req.body.img = JSON.stringify(req.body.img);
    //req.body.startDate = formatDateForDB(req.body.startDate);
    //req.body.endDate = formatDateForDB(req.body.endDate);
    //

});

router.put('/:id', function (req, res) {
    console.log("sending");

    req.body.schedule = JSON.stringify(req.body.schedule);
    req.body.not_inclusive = JSON.stringify(req.body.not_inclusive);
    req.body.inclusive = JSON.stringify(req.body.inclusive);
    req.body.img = JSON.stringify(req.body.img);
    req.body.startDate = formatDateForDB(req.body.startDate);
    req.body.endDate = formatDateForDB(req.body.endDate);

    db.query('UPDATE tours AS t SET ? WHERE id = ' + req.params.id, req.body, function (err, result) {
        if (err) {
            res.json({code: 500, message:"Tour was not changed"});
        }
        res.json({code: 200, message:"Success!"})
    });
});

router.get('/remove/:id',checkAdmin, function (req, res) { //get tour by id
router.get('/remove/:id', function (req, res) { //remove tour by id
    db.query('SELECT img, cover FROM tours WHERE id = ' + req.params.id, function (err, rows, fields) {
        var imgDeleteArr = [], img = {}, cover;

        if (err) {
            res.send({
                message: "Can't find such tour!",
                code: 500
            });
        }

        if(rows[0].img){
            img = JSON.parse(rows[0].img);
        }

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

function formatDate (date, joinSymb) {
    return [date.getDate(), date.getMonth() + 1, date.getFullYear()].join(joinSymb + "");
}

function formatDateForDB (dateStr) {
    var dateArr = dateStr.split(".");
    return dateArr.reverse().join("-");
}

module.exports = router;




