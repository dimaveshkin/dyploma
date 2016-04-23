var express = require("express");
var bodyParser = require('body-parser');
var apiRouter = require("./api");
var captchapng = require('captchapng');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var compression = require('compression');
var checkAdmin = require("./middleware/checkAdmin");
var cryptPassword = require('./helpers/cryptPassword');
var app = express();

var oneDay = 86400000;

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use(compression());

app.use(session({
    secret: 'epam',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 900000 //15 mins
    }
}));

app.set('port', 3000);

app.use("/images", express.static(__dirname + '/images/build', {maxAge: oneDay}));
app.use(express.static(__dirname + '/public/build'));

app.get("/captcha.png", function(req, res, next) {
    req.session.captcha = parseInt(Math.random()*9000+1000);

    var p = new captchapng(140,50,req.session.captcha); // width,height,numeric captcha
    p.color(255, 255, 255, 255);  // First color: background (red, green, blue, alpha)
    p.color(153, 153, 153, 255); // Second color: paint (red, green, blue, alpha)
    var img = p.getBase64();
    var imgbase64 = new Buffer(img,'base64');

    res.send(imgbase64);
});

app.use("/api", apiRouter);

app.use("/admin", function (req, res) {
    
    if(req.session.admin) {
        res.sendFile(__dirname + "/admin_public/build/pass.html");
    } else {
        res.sendFile(__dirname + "/public/build/login.html");
    }
});

app.use("/adminstatic/**", checkAdmin);
app.use("/adminstatic", express.static(__dirname + '/admin_public/build'));

app.use(function(req, res, next) {
    res.sendFile(__dirname + "/public/build/index.html");
});

app.listen(app.get('port'), function() {
    console.log('Express server listening on port %d ', app.get('port'));
});