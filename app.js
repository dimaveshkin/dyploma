var express = require("express");
var bodyParser = require('body-parser');
var galleryAPI = require('./api/gallery/index');
var app = express();

app.use(bodyParser.json());

app.set('port', 3000);

app.use(express.static(__dirname + '/public/build'));

app.get("/", function(req, res, next) {
    res.sendFile(__dirname + "/public/build/index.html");
});

app.use('/api/gallery', galleryAPI);


app.listen(app.get('port'), function() {
    console.log('Express server listening on port %d ', app.get('port'));
});