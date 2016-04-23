var Backbone = require("backbone");
var _ = require("underscore");
Backbone.$ = window.$;

var AppView = require("../view/AppView");
//var GalleryPageView = require("../view/GalleryPageView");
var MainPageView = require("../view/MainPageView");
var ContactsPageView = require("../view/ContactsPageView");
//var NotFoundPageView = require("../view/NotFoundPageView");
//var AboutPageView = require("../view/AboutPageView");
//var CountryGalleryPageView = require("../view/CountryGalleryPageView");
//var TourPageView = require("../view/TourPageView");
//var ToursPageView = require("../view/ToursPageView");
//var LoginPageView = require("../view/LoginPageView");
//var socials = require("../models/SocialsModel");

var Router = Backbone.Router.extend({
  routes: {
    "": "index",
    "contacts": "contacts"
//        "tours": "tours",
//        "about": "about",
//        "gallery/:name": "countryGallery",
//        "login": "login",
//        "admin/password": "adminPassword",
//        "tours/:id": "tourInfo",
//        "*NotFound": "notFound"
  },
  initialize: function (options) {
    _.bindAll(this, "index");

    this.appView = new AppView({router: this});

    this.appView.render();

    this.mainPageView = new MainPageView({router: this});
    this.contactsPageView = new ContactsPageView({router: this});

  },
  index: function () {
    this.mainPageView.render();
  },
  contacts: function () {
    this.contactsPageView.render();
  }
});

module.exports = Router;