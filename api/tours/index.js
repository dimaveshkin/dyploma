const express = require('express'),
    router = express.Router(),
    imgPath = require('../../helpers/imgPath'),
    db = require('../../helpers/db'),
    del = require('del'),
    checkAdmin = require('../../middleware/checkAdmin'),
    TOURS_SOURCE = "/images/tours/",
    imgBuildDeletePath = "images/build/tours/",
    fs = require('fs'),
    path = require('path'),
    multiparty = require('multiparty'),
    mail = require('../../helpers/mailSender');

router.get('/', function (req, res) { //get tours list
    db.query('SELECT id, title, t.desc, startDate, endDate, latitude, longitude, cover  FROM tours as t', function (err, rows, fields) {
        if (err) throw err;

        var obj = imgPath.concatPath(rows, 'cover', TOURS_SOURCE);
        res.send(obj);
    });
});

router.post('/', checkAdmin, function (req, res) { //insert new tour
    var form = new multiparty.Form({uploadDir: imgBuildDeletePath});
    form.parse(req, function(err, fields, files) {
        var data = {};
        if(!files) {
            data = JSON.parse(req.body.data);
        } else {
            data = JSON.parse(fields.data);
        }
         for(var part in data.img) {
            for(var i = 0; i < data.img[part].length; i++){
                if(data.img[part][i] !== "") {
                    data.img[part][i] =  path.basename(files[part].shift().path);
                }
            }
        }
        data.cover =  path.basename(files['cover'][0].path);

        data.schedule = JSON.stringify(data.schedule);
        data.not_inclusive = JSON.stringify(data.not_inclusive);
        data.inclusive = JSON.stringify(data.inclusive);
        data.img = JSON.stringify(data.img);
        data.startDate = formatDateForDB(data.startDate);
        data.endDate = formatDateForDB(data.endDate);

        db.query('INSERT INTO tours SET ?', data, function (err, rows, fields) {
            if (err) {
                res.json({code: 500, message: "Не удалось сохранить фототур."});
                throw err;
            }

            res.json({code: 200, message: "Фототур сохранен."});
        });
    });

});

router.get('/requests',checkAdmin, function (req, res) { //get tours list which have requests
    db.query("SELECT t.id, t.title, startDate, endDate," +
        "COUNT(r.id) as count_all," +
        "SUM(IF(rs.status = 'Новая', 1, 0)) as count_new," +
        "SUM(IF(rs.status = 'Принятая', 1, 0)) as count_approved," +
        "SUM(IF(rs.status = 'Отклоненная', 1, 0)) as count_declined,t.places " +
        "FROM tours AS t " +
        "INNER JOIN requests AS r " +
        "ON r.tour_id = t.id " +
        "INNER JOIN request_statuses as rs " +
        "ON r.status = rs.id " +
        "GROUP BY t.title", function (err, rows, fields) {
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

        db.query('SELECT * FROM tours AS t, requests AS r WHERE  t.id = r.tour_id AND r.id=' + req.params.id, function(err, rows, fields) {
            var mailOptions = {
                subject: 'Заявка на фототур ' + rows[0].title , // Subject line
                html: 'Ваша заявка на фототур <b>'  +  rows[0].title + '</b> принята.',// html body
                to: rows[0].email// to
            };

            mail(mailOptions);
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

        db.query('SELECT * FROM tours AS t, requests AS r WHERE  t.id = r.tour_id AND r.id=' + req.params.id, function(err, rows, fields) {
            var mailOptions = {
                subject: 'Заявка на фототур ' + rows[0].title , // Subject line
                html: 'Ваша заявка на фототур '  +  rows[0].title + ' <b>отклонена.</b>',// html body
                to: rows[0].email// to
            };

            mail(mailOptions);
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

router.get('/active', function (req, res) { //get tours list
    db.query('SELECT id, title, t.desc, startDate, endDate, latitude, longitude, cover  FROM tours as t WHERE startDate <= CURDATE() AND CURDATE() <= endDate', function (err, rows, fields) {
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
        //console.log(response.data);
        imgPath.concatPath(rows, 'cover', '/images/tours/');

        for(var part in response.data.img) {
            for(var i = 0; i < response.data.img[part].length; i++){
                if(response.data.img[part][i] === TOURS_SOURCE) {
                    delete response.data.img[part][i];
                }
            }
        }


        response.message = "Тур найден.";
        response.code = 200;
        res.send(response);
    });
});

router.post('/:id', checkAdmin, function (req, res) {
    var form = new multiparty.Form({uploadDir: imgBuildDeletePath});
    form.parse(req, function(err, fields, files) {
        var data = {};

        if(!files) {
            data = JSON.parse(req.body.data);

            delete  data.img;
            delete  data.cover;
            res.send(updateTour(data, req.params.id));
        } else {
            data = JSON.parse(fields.data);
            db.query('SELECT * FROM tours WHERE id=' + req.params.id, function (err, rows, fields) {
                if (err) throw err;

                var dbImg = JSON.parse(rows[0].img);
                var imgDeleteArr = [];

                    for(var part in data.img) {
                        for(var i = 0; i < data.img[part].length; i++){
                            if(data.img[part][i] !== "") {
                                data.img[part][i] =  path.basename(files[part].shift().path);

                                if(dbImg[part][i] !== "") {
                                    imgDeleteArr.push(dbImg[part][i]);
                                }
                            } else if(dbImg[part][i] !== "") {
                                data.img[part][i] = dbImg[part][i];
                            }
                        }
                }

                if(!data.cover) {
                    delete  data.cover;
                } else {
                    data.cover =  path.basename(files['cover'][0].path);
                    imgDeleteArr.push(rows[0].cover);
                }

                imgDeleteArr = imgDeleteArr.map(function (imgName) {
                    if(imgName != '') {
                        return imgBuildDeletePath + imgName;
                    }
                    return '';
                });

                del(imgDeleteArr).then(function (paths) {
                    console.log("Deleted from tours: \n" + imgDeleteArr.join("\n"));
                });


                data.img = JSON.stringify(data.img);
                res.send(updateTour(data, req.params.id));

            });
        }
    });
});

router.get('/remove/:id', checkAdmin, function (req, res) { //remove tour by id
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
                if(imgName != '') {
                    return imgBuildDeletePath + imgName;
                }
                    return '';
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


router.post('/create/new', function (req, res) {//add new request
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

function updateTour(data, id) {
    data.schedule = JSON.stringify(data.schedule);
    data.not_inclusive = JSON.stringify(data.not_inclusive);
    data.inclusive = JSON.stringify(data.inclusive);
    data.startDate = formatDateForDB(data.startDate);
    data.endDate = formatDateForDB(data.endDate);

    db.query('UPDATE tours AS t SET ? WHERE id = ' + id, data, function (err, result) {
        if (err) {
            return {code: 500, message:"Tour was not changed"};
        }
        return {code: 200, message:"Success!"};
    });
}

module.exports = router;




