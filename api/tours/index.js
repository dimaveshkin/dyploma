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

/**
 * get tours list
 */
router.get('/', function (req, res) {
    db.query('SELECT id, title, t.desc, startDate, endDate, latitude, longitude, cover  FROM tours as t', function (err, rows, fields) {
        if (err) {
            res.send({
                message: "Error in getting tours",
                code: 500
            });

            return
        }

        var obj = imgPath.concatPath(rows, 'cover', TOURS_SOURCE);
        res.send(obj);
    });
});

/**
 * add new tour to DB
 */
router.post('/', checkAdmin, function (req, res) {
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


        db.query('INSERT INTO tours SET ?', [data], function (err, rows, fields) {
            if (err) {
                res.json({code: 500, message: "Не удалось сохранить фототур."});
                return;
            }

            res.json({code: 200, message: "Фототур сохранен."});
        });
    });

});

/**
 * get tours list which has requests from users
 */
router.get('/requests',checkAdmin, function (req, res) {
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
        if (err) {
            res.send({
                message: "Error in getting requests",
                code: 500
            });
        } else {
            res.send(rows);
        }
    });
});

/**
 * get requests from user by tour id
 */
router.get('/requests/:id',checkAdmin, function (req, res) {
    db.query('SELECT r.id, r.name, r.email, r.application, r.date, s.status FROM requests AS r, request_statuses AS s WHERE s.id = r.status AND tour_id = ' + db.escape(req.params.id) + ' ORDER BY(s.status) desc', function (err, rows, fields) {
        if (err) {
            res.send({
                message: "Error in getting tours",
                code: 500
            });
        } else {
            res.send(rows);
        }
    });
});

/**
 * accept request for tour by id
 */
router.post('/requests/accept/:id',checkAdmin, function (req, res) { //accept requests by id
    db.query('UPDATE requests SET ? WHERE id =' + db.escape(req.params.id), [{status: 2}], function(err, result) {
        if (err) {
            res.send({
                error: "Can't accept request",
                code: 500
            });
            return;
        }

        db.query('SELECT * FROM tours AS t, requests AS r WHERE  t.id = r.tour_id AND r.id= ?', [req.params.id], function(err, rows, fields) {
            if (err) {
                res.send({
                    error: "Can't accept request",
                    code: 500
                });
                return;
            }

            res.send({
                message: "Accepted",
                code: 200
            });

            var mailOptions = {
                subject: 'Заявка на фототур ' + rows[0].title , // Subject line
                html: 'Ваша заявка на фототур <b>'  +  rows[0].title + '</b> принята.',// html body
                to: rows[0].email// to
            };

            mail(mailOptions);
        });
    });
});

/**
 * reject request for tour by id
 */
router.post('/requests/reject/:id',checkAdmin, function (req, res) {
    db.query('UPDATE requests SET ? WHERE id =' + db.escape(req.params.id), [{status: 3}], function(err, result) {
        if (err) {
            res.send({
                error: "Can't reject request",
                code: 500
            });
            return;
        }
        db.query('SELECT * FROM tours AS t, requests AS r WHERE  t.id = r.tour_id AND r.id=' + db.escape(req.params.id), function(err, rows, fields) {
            if (err) {
                res.send({
                    error: "Can't reject request",
                    code: 500
                });
                return;
            }

            res.send({
                message: "Rejected",
                code: 200
            });

            var mailOptions = {
                subject: 'Заявка на фототур ' + rows[0].title , // Subject line
                html: 'Ваша заявка на фототур '  +  rows[0].title + ' <b>отклонена.</b>',// html body
                to: rows[0].email// to
            };

            mail(mailOptions);
        });
    });
});

/**
 * delete requests from Db by id
 */
router.post('/requests/delete/:id',checkAdmin, function (req, res) {
    db.query('DELETE FROM requests WHERE id =' + db.escape(req.params.id), function (err, rows) {
        if (err) {
            res.json({code: 500, error:"Nothing has been deleted!"});
        } else {
            res.json({code: 200, message:"Success!"});
        }
    });
});

/**
 * get passed tours list
 */
router.get('/prev', function (req, res) {
    db.query('SELECT id, title, t.desc, startDate, endDate, latitude, longitude, cover  FROM tours as t WHERE startDate <= NOW()', function (err, rows, fields) {
        if (err) {
            res.json({code: 500, error:"Error in getting tours"});
        } else {
            res.send(imgPath.concatPath(rows, 'cover', TOURS_SOURCE));
        }
    });
});

/**
 * get future tours list
 */
router.get('/next', function (req, res) {
    db.query('SELECT id, title, t.desc, startDate, endDate, latitude, longitude, cover  FROM tours as t WHERE startDate > NOW()', function (err, rows, fields) {
        if (err) {
            res.json({code: 500, error: "Error in getting tours"});
        } else {
            res.send(imgPath.concatPath(rows, 'cover', TOURS_SOURCE));
        }
    });
});

/**
 * get active tour
 */
router.get('/active', function (req, res) {
    db.query('SELECT id, title, t.desc, startDate, endDate, latitude, longitude, cover  FROM tours as t WHERE startDate <= CURDATE() AND CURDATE() <= endDate', function (err, rows, fields) {
        if (err) {
            res.json({code: 500, error: "Error in getting tour"});
        } else {
            res.send(imgPath.concatPath(rows, 'cover', TOURS_SOURCE));
        }
    });
});

/**
 * get tour information by id
 */
router.get('/:id', function (req, res) {
    db.query('SELECT *  FROM tours WHERE id= ?', [req.params.id], function (err, rows, fields) {
        var response = {};

        if (err || !rows.length) {
            res.json({code: 500, error: "Error in getting tour"});
            return;
        }

        rows[0].schedule = JSON.parse(rows[0].schedule);
        rows[0].not_inclusive = JSON.parse(rows[0].not_inclusive);
        rows[0].inclusive = JSON.parse(rows[0].inclusive);

        response.data = imgPath.JSONPath(rows, 'img')[0];

        imgPath.concatPath(rows, 'cover', '/images/tours/');

        for(var part in response.data.img) {
            for(var i = 0; i < response.data.img[part].length; i++){
                if(response.data.img[part][i] === TOURS_SOURCE) {
                    delete response.data.img[part][i];
                }
            }
        }

        res.send(response);
    });
});

/**
 * update tour info by id
 */
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
            db.query('SELECT * FROM tours WHERE id= ?', [req.params.id], function (err, rows, fields) {
                if (err) {
                    res.json({code: 500, error: "Error in updating tour"});
                    return;
                }

                var dbImg = JSON.parse(rows[0].img);
                var imgDeleteArr = [];

                for (var part in data.img) {
                    for (var i = 0; i < data.img[part].length; i++) {
                        if (data.img[part][i] !== "") {
                            data.img[part][i] = path.basename(files[part].shift().path);

                            if (dbImg[part][i] !== "") {
                                imgDeleteArr.push(dbImg[part][i]);
                            }
                        } else if (dbImg[part][i] !== "") {
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

/**
 * remove tour by id
 */
router.get('/remove/:id', checkAdmin, function (req, res) {
    db.query('SELECT img, cover FROM tours WHERE id = ?', [req.params.id], function (err, rows, fields) {
        var imgDeleteArr = [], img = {}, cover;

        if (err) {
            res.send({
                message: "Can't find such tour!",
                code: 500
            });
            return
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

        db.query('DELETE FROM tours WHERE id = ?', [req.params.id], function (err, rows, fields) {
            if (err) {
                res.send({
                    message: "Can't delete tour!",
                    code: 500
                });
                return
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

/**
 * add new request for tour
 */
router.post('/create/new', function (req, res) {
    var request = {};
    if (req.session.captcha == req.body.captha) {
        request.date = new Date();
        request.name = req.body.name;
        request.email = req.body.email;
        request.application = req.body.application;
        request.status = 1;
        request.tour_id = req.body.tour_id;

        db.query('INSERT INTO requests SET ?', [request], function (err, result) {
            if (err) {
                res.json({code: 500, message: "Error in getting tour"});
            } else {
                res.send(request);
            }
        });
    } else {
        res.send({error: 'Вы неверно ввели символы'});
    }
});

/**
 * format date from DB
 * @param date
 * @param joinSymb
 * @returns {string}
 */
function formatDate (date, joinSymb) {
    return [date.getDate(), date.getMonth() + 1, date.getFullYear()].join(joinSymb + "");
}

/**
 * format date for saving ing DB
 * @param date
 * @param joinSymb
 * @returns {string}
 */
function formatDateForDB (dateStr) {
    var dateArr = dateStr.split(".");
    return dateArr.reverse().join("-");
}

/**
 * update tour by id
 * @param data
 * @param id
 */
function updateTour(data, id) {
    data.schedule = JSON.stringify(data.schedule);
    data.not_inclusive = JSON.stringify(data.not_inclusive);
    data.inclusive = JSON.stringify(data.inclusive);
    data.startDate = formatDateForDB(data.startDate);
    data.endDate = formatDateForDB(data.endDate);

    db.query('UPDATE tours AS t SET ? WHERE id = ' + db.escape(id), [data], function (err, result) {
        if (err) {
            return {code: 500, message:"Tour was not changed"};
        }
        return {code: 200, message:"Success!"};
    });
}

module.exports = router;




