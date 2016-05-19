const express = require('express'),
    router = express.Router(),
    db = require('../../helpers/db'),
    imgPath = require('../../helpers/imgPath'),
    checkAdmin = require('../../middleware/checkAdmin'),
    del = require('del'),
    transliteration = require('transliteration.cyr'),
    imgSrcDeletePath = "images/src/",
    imgBuildDeletePath = "images/build/gallery/",
    http = require('http'),
    util = require('util'),
    fs = require('fs'),
    multiparty = require('multiparty');

router.post('/upload', checkAdmin, function (req, res) {//upload photo
    var form = new multiparty.Form({uploadDir: imgBuildDeletePath});
    form.parse(req, function(err, fields, files) {
      db.query('SELECT international FROM countries WHERE id = ' + fields.id, function (err, name, field) {
        if (err) throw err;
        console.log(name);
        var international = name[0].international;
          console.log(util.inspect(files));

        for(var i = 0, length = files.images.length; i < length; i++) {
          fs.rename(files.images[i].path, imgBuildDeletePath + international + "/" + files.images[i].originalFilename, function(err) {
            if ( err ) console.log('ERROR: ' + err);
          });

          var photo = {
            src: international + "/" + files.images[i].originalFilename,
            country_id: fields.id,
            is_best: 0,
            title: fields['title[]'][i],
            desc: fields['desc[]'][i]
          };

          db.query('INSERT INTO photos SET ?', photo, function (err, result) {
            if (err) throw err;
          });
        }
      });

        res.send(util.inspect({fields: fields, files: files}));
    });
});

router.put('/photo/update/:id', checkAdmin, function (req, res) {//update title and desc in photo
  db.query('UPDATE photos AS p SET ? WHERE id =' + req.params.id, {title: req.body.title, desc: req.body.desc},
    function (err, result) {
      if (err) {
        res.json({code: 500, error:"Desc not changed"});
        throw err;
      }
      res.json({code: 200, message:"Success!"})
    });
});


router.get('/countries', function (req, res) {//countries list
    db.query('SELECT * FROM countries', function (err, rows, fields) {
        if (err) throw err;
        for(var i = 0; i < rows.length; i++) {
            if(rows[i].cover === '') {
                rows[i].cover = 'default.jpg';
            }
        }

        res.send(imgPath.concatPath(rows, 'cover'));
    });
});


router.get('/cover/:countryId/:photoId', checkAdmin, function (req, res) {//change cover for country
  db.query('SELECT src FROM photos WHERE id = ' + req.params.photoId, function (err, pic, fields) {
    if (err) throw err;

    db.query('UPDATE countries SET cover = "' +  pic[0].src + '" WHERE id = ?', [req.params.countryId],
        function (err, result) {
          if (err) {
            res.json({code: 500, error:"Cover not changed"});
            throw err;
          }
          res.json({code: 200, message:"Success!"})
        });
  });
});



router.post('/countries/add', checkAdmin, function (req, res) {//add new empty country

    var post = {
        name: req.body.country,
        international: req.body.international || transliteration.transliterate(req.body.country),
        cover: ""
    };

    if(req.body.cover) {
      post.cover = post.international + "/" + req.body.cover;
    }

    db.query('INSERT INTO countries SET ?', post, function (err, result) {
//      console.log(result);
      if (err) {
        res.json({code: 500, error:"Category not added"});
        throw err;
      }



      if (!fs.existsSync(imgBuildDeletePath + post.international)){
        fs.mkdirSync(imgBuildDeletePath + post.international);
      }

      res.send({id: result.insertId});
    });


});

router.get('/best', function (req, res) {//best
    db.query('SELECT id, src, title, p.desc FROM photos as p where is_best = true', function (err, rows, fields) {
        if (err) throw err;

        res.send(imgPath.concatPath(rows));
    });
});
//TODO: check admin
router.get('/best/add/:id', checkAdmin, function (req, res) {//add to best
    db.query('UPDATE photos SET is_best = 1 WHERE id = ? ', [req.params.id],
        function (err, result) {
            if (err) throw err;
            res.send(true);
        });
});

router.get('/best/remove/:id', checkAdmin, function (req, res) {//remove from best
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

router.get('/photo/remove/:id', checkAdmin, function (req, res) { //remove photo by id

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
      db.query('SELECT cover, id, name FROM countries WHERE international ="' + req.params.location + '"', function (err, rows, fields) {
        if (err) throw err;
        country.id = rows[0].id;
        imgPath.concatPath(rows, 'cover');
        country.cover = rows[0].cover;
        country.name = rows[0].name;

        res.send(country);
      });
    });
});

//TODO: check admin
router.get('/country/remove/:location', checkAdmin, function (req, res) { //by country
    db.query('SELECT id FROM countries WHERE international = \'' + req.params.location + '\'', function (err, rows, fields) {
        var id, photos = [];
        if (err) throw err;
        if(rows){
            id = rows[0].id;
            db.query('SELECT src FROM photos WHERE country_id = ' + id, function (err, rows, fields) {
                rows.forEach(function (row) {
                    photos.push(imgBuildDeletePath + row.src);
                });

                db.query('DELETE FROM countries WHERE international = \'' + req.params.location + '\'', function (err, rows) {
                    if (err) throw err;
                    console.log(rows);
                    del(photos).then(function (paths) {
                        if(paths) {
                            console.log("Deleted:\n" + paths.join("\n"));
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