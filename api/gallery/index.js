const express = require('express'),
    router = express.Router(),
    db = require('../../helpers/db'),
    imgPath = require('../../helpers/imgPath'),
    checkAdmin = require('../../middleware/checkAdmin'),
    del = require('del'),
    transliteration = require('transliteration.cyr'),
    imgBuildDeletePath = "images/build/gallery/",
    http = require('http'),
    util = require('util'),
    fs = require('fs'),
    path = require('path'),
    multiparty = require('multiparty');

/**
 * upload photo category by id
 */
router.post('/upload', checkAdmin, function (req, res) {
    var form = new multiparty.Form({uploadDir: imgBuildDeletePath});

    form.parse(req, function (err, fields, files) {
        db.query('SELECT international FROM countries WHERE id = ?', [fields.id], function (err, name, field) {
            if (err) {
                res.send({
                    message: "Error in uploading photos",
                    code: 500
                });
                return;
            }

            var international = name[0].international;

            for (var i = 0, length = files.images.length; i < length; i++) {
                var newName = path.basename(files.images[i].path);

                fs.rename(files.images[i].path, imgBuildDeletePath + international + "/" + newName, function (err) {
                    if (err) {
                        res.send({
                            message: "Error in uploading photos",
                            code: 500
                        });

                    }
                });
                    var photo = {
                        src: international + "/" + newName,
                        country_id: fields.id,
                        is_best: 0,
                        title: fields['title[]'][i],
                        desc: fields['desc[]'][i]
                    };

                    db.query('INSERT INTO photos SET ?', [photo], function (err, result) {
                        if (err) {
                            res.send({
                                message: "Error in uploading photos",
                                code: 500
                            });
                        } else {
                            res.send(util.inspect({fields: fields, files: files}));
                        }
                    });

            }
        });
    });
});

/**
 * update title and description of photo by id
 */
router.put('/photo/update/:id', checkAdmin, function (req, res) {
    db.query('UPDATE photos AS p SET ? WHERE id =' + db.escape(req.params.id), [{title: req.body.title, desc: req.body.desc}],
        function (err, result) {
            if (err) {
                res.json({code: 500, error: "Desc not changed"});
            } else {
                res.json({code: 200, message: "Success!"})
            }
        });
});

/**
 * return categories list
 */
router.get('/countries', function (req, res) {
    db.query('SELECT * FROM countries', function (err, rows, fields) {
        if (err)  {
            res.json({code: 500, error: "Can't get countries list"});
        } else {
            for (var i = 0; i < rows.length; i++) {
                if (rows[i].cover === '') {
                    rows[i].cover = 'default.jpg';
                }
            }
            res.send(imgPath.concatPath(rows, 'cover'));
        }
    });
});

/**
 * change cover for country by id
 */
router.get('/cover/:countryId/:photoId', checkAdmin, function (req, res) {
    db.query('SELECT src FROM photos WHERE id = ?', [req.params.photoId], function (err, pic, fields) {
        if (err) {
            res.json({code: 500, error: "Cover not changed"});
            return;
        }

        db.query('UPDATE countries SET cover = ' + db.escape(pic[0].src) + ' WHERE id = ?', [req.params.countryId],
            function (err, result) {
                if (err) {
                    res.json({code: 500, error: "Cover not changed"});
                } else {
                    res.json({code: 200, message: "Success!"})
                }

            });
    });
});

/**
 * add new empty category to DB
 */
router.post('/countries/add', checkAdmin, function (req, res) {
    var post = {
        name: req.body.country,
        international: req.body.international || transliteration.transliterate(req.body.country),
        cover: ""
    };

    try {
        if (!fs.existsSync(imgBuildDeletePath + post.international)) {
            fs.mkdirSync(imgBuildDeletePath + post.international);
        }

        db.query('INSERT INTO countries SET ?', [post], function (err, result) {
            if (err) {
                res.json({code: 500, error: "Category not added"});
            } else {
                res.send({id: result.insertId});
            }
        });
    }
    catch(e) {
        res.json({code: 500, error: "Нельзя создать папку с таким именем"});
    }

});

/**
 * get all best photos
 */
router.get('/best', function (req, res) {
    db.query('SELECT id, src, title, p.desc FROM photos as p where is_best = true', function (err, rows, fields) {
        if (err) {
            res.json({code: 500, error: "Can't get best photos"});
        } else {
            res.send(imgPath.concatPath(rows));
        }
    });
});

/**
 * add photo to best by id
 */
router.get('/best/add/:id', checkAdmin, function (req, res) {
    db.query('UPDATE photos SET is_best = 1 WHERE id = ? ', [req.params.id],
        function (err, result) {
            if (err) {
                res.json({code: 500, message: "Photo not updated"});
            } else {
                res.json({code: 200, message: "Success!"})
            }
        });
});

/**
 * remove photo from best by id
 */
router.get('/best/remove/:id', checkAdmin, function (req, res) {
    db.query('UPDATE photos SET is_best = 0 WHERE id = ?', [req.params.id],
        function (err, result) {
            if (err) {
                res.json({code: 500, message: "Photo not updated"});
            } else {
                res.json({code: 200, message: "Success!"})
            }
        });
});

/**
 * get all photos from DB
 */
router.get('/all', function (req, res) {
    db.query('SELECT id, src, title, p.desc FROM photos as p', function (err, rows, fields) {
        if (err) {
            res.json({code: 500, message: "Can't get all photos"});
        } else {
            res.send(imgPath.concatPath(rows));
        }
    });
});

/**
 * remove photo by id
 */
router.get('/photo/remove/:id', checkAdmin, function (req, res) {
    db.query('SELECT src FROM photos WHERE id = ?', [req.params.id], function (err, src, fields) {
        if (err) {
            res.json({code: 500, error: "Can't remove photo"});
            return;
        }
        db.query('DELETE FROM photos WHERE id = ?', [req.params.id], function (err, rows) {
            if (err) {
                res.json({code: 500, error: "Can't remove photo"});
                return;
            }
            del(imgBuildDeletePath + src[0].src).then(function (paths) {
                if (paths) {
                    console.log("Deleted:\n" + paths.join("\n"));
                    res.json({code: 200, message: "Success!"})
                } else {
                    res.json({code: 500, error: "Nothing has been deleted!"})
                }
            });
        });
    });
});

/**
 * get photos dy country name
 */
router.get('/country/:location', function (req, res) {
    var country = {};

    db.query('SELECT p.id, src, title, p.desc, name, p.is_best FROM photos as p, countries as c WHERE c.international =' + db.escape(req.params.location) + ' AND p.country_id = c.id', function (err, rows, fields) {
        if (err) {
            res.json({code: 500, error: "Can't get photo"});
            return;
        }

        country.list = imgPath.concatPath(rows);

        db.query('SELECT cover, id, name FROM countries WHERE international =' +  db.escape(req.params.location), function (err, rows, fields) {
            if (err || !rows.length) {
                res.json({code: 500, error: "Can't get photo"});
                return;
            }
            country.id = rows[0].id;
            imgPath.concatPath(rows, 'cover');
            country.cover = rows[0].cover;
            country.name = rows[0].name;

            res.send(country);
        });
    });
});

/**
 * remove category by category name
 */
router.get('/country/remove/:location', checkAdmin, function (req, res) {
    db.query('SELECT id FROM countries WHERE international =' +  db.escape(req.params.location), function (err, rows, fields) {
        var id, photos = [];

        if (err) {
            res.json({code: 500, message: "Can't remove category photo"});
            return;
        }

        if (rows.length) {
            id = rows[0].id;
            db.query('SELECT src FROM photos WHERE country_id = ' + db.escape(id), function (err, rows, fields) {
                if (err) {
                    res.json({code: 500, message: "Can't remove category photo"});
                    return;
                }
                rows.forEach(function (row) {
                    photos.push(imgBuildDeletePath + row.src);
                });

                db.query('DELETE FROM countries WHERE international =' + db.escape(req.params.location), function (err, rows) {
                    if (err) {
                        res.json({code: 500, message: "Can't remove category photo"});
                        return;
                    }
                    del(photos).then(function (paths) {
                        if (paths) {
                            console.log("Deleted:\n" + paths.join("\n"));
                            res.json({code: 200, message: "Success!"})
                        } else {
                            res.json({code: 500, message: "Nothing has been deleted!"})
                        }
                    });
                });
            });
        } else {
            res.json({code: 404, message: "No country found!"})
        }
    });
});

/**
 * get all, best, categories photo
 */
router.get('/getGallery', function (req, res) {
    var gallery = {};

    executeQuery('SELECT id, src, title, p.desc FROM photos as p')
        .then(function (img) {
            gallery.all = img;
            return executeQuery('SELECT id, src, title, p.desc FROM photos as p where is_best = true');
        })
        .then(function (img) {
            gallery.best = img;
            return executeQuery('SELECT c.id, c.name, c.international, c.cover FROM countries AS c INNER JOIN photos AS p ON p.country_id = c.id GROUP BY c.name ORDER BY c.id ASC ', 'cover');
        })
        .then(function (list) {
            gallery.counties = list;
            res.send(gallery);
        });
});

/**
 * exexute sql query and concat path form img
 * @param query
 * @param path
 * @returns {Promise}
 */
function executeQuery(query, path) {
    return new Promise(function (resolve, reject) {
        db.query(query, function (err, rows, fields) {
            if (err) reject(new Error(err));

            resolve(imgPath.concatPath(rows, path));
        });
    });
}

module.exports = router;