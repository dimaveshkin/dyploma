const express = require('express'),
    router = express.Router(),
    db = require('../../helpers/db'),
    imgPath = require('../../helpers/imgPath'),
    del = require('del'),
    transliteration = require('transliteration.cyr'),
    imgSrcDeletePath = "images/src/",
    imgBuildDeletePath = "images/build/gallery/";

http = require('http'),
    util = require('util'),
    fs = require('fs'),
    multiparty = require('multiparty');

router.post('/upload', function (req, res) {//upload photo

    var form = new multiparty.Form({uploadDir: "test"});
    //res.send('ok');
    form.parse(req, function(err, fields, files) {

        for(var i = 0, length = files.image.length; i < length; i++) {
            console.log(files.image[i].path);
            console.log(files.image[i].originalFilename);

            fs.rename(files.image[i].path, 'test/' + files.image[i].originalFilename, function(err) {
                if ( err ) console.log('ERROR: ' + err);
            });
        }

        //res.writeHead(200, {'content-type': 'text/plain'});
        //res.write('received upload:\n\n');
        //res.end(util.inspect({fields: fields, files: files}));

        res.send(util.inspect({fields: fields, files: files}));
    });
});

router.get('/countries', function (req, res) {//countries list
    db.query('SELECT * FROM countries', function (err, rows, fields) {
        if (err) throw err;

        res.send(imgPath.concatPath(rows, 'cover'));
    });
});

router.post('/countries/add', function (req, res) {//add new empty country
    var post = {
        name: req.body.country,
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

        res.send(imgPath.concatPath(rows));
    });
});
//TODO: check admin
router.get('/best/add/:id', function (req, res) {//add to best
    db.query('UPDATE photos SET is_best = 1 WHERE id = ? ', [req.params.id],
        function (err, result) {
            if (err) throw err;
            res.send(true);
        });
});

router.get('/best/remove/:id', function (req, res) {//remove from best
    db.query('UPDATE photos SET is_best = 0 WHERE id = ?', [req.params.id],
        function (err, result) {
            if (err) throw err;
            res.send(true);
        });
});

router.get('/all', function (req, res) { //all
    db.query('SELECT id, src, title, p.desc FROM photos as p', function (err, rows, fields) {
        if (err) throw err;

        res.send(imgPath.concatPath(rows));
    });
});

router.get('/photo/remove/:id', function (req, res) { //remove photo by id

  db.query('SELECT src FROM photos WHERE id = ' + req.params.id, function (err, src, fields) {
    if (err) throw err;
    db.query('DELETE FROM photos WHERE id ="' + req.params.id + '"', function (err, rows) {
      if (err) throw err;
      del(imgBuildDeletePath + src[0].src).then(function (paths) {
        if(paths) {
          console.log("Deleted:\n" + paths.join("\n"));

          res.json({code: 200, message:"Success!"})
        } else {
          res.json({code: 500, error:"Nothing has been deleted!"})
        }
      });
    });

//    res.send('ok');
//    db.query('DELETE FROM photos WHERE id ="' + req.params.id + '"', function (err, rows) {
//      if (err) throw err;
//
//    });
  });

});


router.get('/country/:location', function (req, res) { //by country
  var country = {};
    db.query('SELECT p.id, src, title, p.desc, name, p.is_best FROM photos as p, countries as c WHERE c.international ="' + req.params.location + '" AND p.country_id = c.id', function (err, rows, fields) {
        if (err) throw err;
//        res.send(imgPath.concatPath(rows));
      country.list = imgPath.concatPath(rows);
      db.query('SELECT cover FROM countries WHERE international ="' + req.params.location + '"', function (err, rows, fields) {
        if (err) throw err;
        country.cover = imgPath.concatPath(rows, 'cover');
        res.send(country);
      });
    });
});

//TODO: check admin
router.get('/country/remove/:location', function (req, res) { //by country
    console.log("here");
    db.query('SELECT id FROM countries WHERE international = \'' + req.params.location + '\'', function (err, rows, fields) {
        var id, photos = [];

        if (err) throw err;
        console.log(rows);
        if(rows){
            id = rows[0].id;
            console.log(id);
            db.query('SELECT src FROM photos WHERE country_id = ' + id, function (err, rows, fields) {
                rows.forEach(function (row) {
                    photos.push(imgBuildDeletePath + row.src);
                });

                console.log(photos);
                db.query('DELETE FROM countries WHERE international = \'' + req.params.location + '\'', function (err, rows) {
                    if (err) throw err;
                    console.log(rows);
                    del(photos).then(function (paths) {
                        if(paths) {
                            console.log("Deleted:\n" + paths.join("\n"))
                            res.json({code: 200, message:"Success!"})
                        } else {
                            res.json({code: 500, message:"Nothing has been deleted!"})
                        }
                    });
                });
            });
        } else {
            res.json({code: 404, message:"No country found!"})
        }
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
            return executeQuery('SELECT c.id, c.name, c.international, c.cover FROM countries AS c INNER JOIN photos AS p ON p.country_id = c.id GROUP BY c.name ORDER BY c.id ASC ', 'cover');
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

            resolve(imgPath.concatPath(rows, path));
        });
    });
}

module.exports = router;