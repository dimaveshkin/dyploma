var Backbone = require("backbone");
var _ = require("underscore");
Backbone.$ = window.$;

var AppView = require("../view/AppView");
var GalleryPageView = require("../view/GalleryPageView");
var MainPageView = require("../view/MainPageView");
var NotFoundPageView = require("../view/NotFoundPageView");
var AboutPageView = require("../view/AboutPageView");
var socials = require("../models/SocialsModel");

var Router = Backbone.Router.extend({
    routes: {
        "": "index",
        "gallery": "gallery",
        "tours": "tours",
        "about": "about",
        "tour": "about",
        "*NotFound": "notFound"
    },
    initialize: function (options) {
        _.bindAll(this, "index", "gallery", "tours", "about");
        
        this.appView = new AppView({router: this});


        this.appView.render();

        this.mainPageView = new MainPageView({router: this});
        this.galleryPageView = new GalleryPageView({router: this});
        this.aboutPageView = new AboutPageView({router: this});
        this.notFoundPageView = new NotFoundPageView({router: this});
    },
    index: function () {
        this.mainPageView.render();
    },
    gallery: function () {
        this.galleryPageView.render();
    },
    tours: function () {
        //TODO: implement tour view render
    },
    about: function () {
        this.aboutPageView.render();
    },
    notFound: function () {
        this.notFoundPageView.render();
    }
});

module.exports = Router;