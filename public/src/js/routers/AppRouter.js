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
var ToursPageView = require("../view/ToursPageView");
var LoginPageView = require("../view/LoginPageView");

var Router = Backbone.Router.extend({
    routes: {
        "": "index",
        "gallery": "gallery",
        "tours": "tours",
        "about": "about",
        "gallery/:name": "countryGallery",
        "login": "login",
        "admin/password": "adminPassword",
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
        this.toursPageView = new ToursPageView({router: this});
        this.loginPageView = new LoginPageView({router: this});
    },
    index: function () {
        this.mainPageView.render();
    },
    gallery: function () {
        this.galleryPageView.render();
    },
    tours: function () {
        this.toursPageView.render();
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
    },
    login: function () {
        this.loginPageView.render();
    },
    adminPassword: function() {

    }
});

module.exports = Router;