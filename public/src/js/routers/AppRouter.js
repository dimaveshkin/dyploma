var Backbone = require("backbone");
var _ = require("underscore");
Backbone.$ = window.$;

var AppView = require("../view/AppView");
var GalleryPageView = require("../view/GalleryPageView");
var MainPageView = require("../view/MainPageView");
var NotFoundPageView = require("../view/NotFoundPageView");
var AboutPageView = require("../view/AboutPageView");
var CountryGalleryPageView = require("../view/CountryGalleryPageView");
var TourPageView = require("../view/TourPageView");
var socials = require("../models/SocialsModel");

var Router = Backbone.Router.extend({
    routes: {
        "": "index",
        "gallery": "gallery",
        "tours": "tours",
        "about": "about",
        "tour": "about",
        "gallery/:name": "countryGallery",
        "tours/:id": "tourInfo",
        "*NotFound": "notFound"
    },
    initialize: function (options) {
        _.bindAll(this, "index", "gallery", "tours", "about", "countryGallery");
        
        this.appView = new AppView({router: this});


        this.appView.render();

        this.mainPageView = new MainPageView({router: this});
        this.galleryPageView = new GalleryPageView({router: this});
        this.aboutPageView = new AboutPageView({router: this});
        this.countryGalleryPageView = new CountryGalleryPageView({router: this});
        this.notFoundPageView = new NotFoundPageView({router: this});
        this.tourPageView = new TourPageView({router: this});
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
    countryGallery: function (name) {
        this.countryGalleryPageView.render(name);
    },
    about: function () {
        this.aboutPageView.render();
    },
    tourInfo: function (id) {
      this.tourPageView.render(id);
    },
    notFound: function () {
        this.notFoundPageView.render();
    }
});

module.exports = Router;