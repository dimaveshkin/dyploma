var Backbone = require("backbone");
var _ = require("underscore");
Backbone.$ = window.$;

var AppView = require("../view/AppView");
var MainPageView = require("../view/MainPageView");
var ContactsPageView = require("../view/ContactsPageView");
var FeedbacksPageView = require("../view/FeedbacksPageView");
var GalleryPageView = require("../view/GalleryPageView");
var GalleryCountryPageTmp = require("../view/GalleryCountryPageView");

var Router = Backbone.Router.extend({
  routes: {
    "admin": "index",
    "admin/contacts": "contacts",
    "admin/feedbacks": "feedbacks",
    "admin/categories": "categories",
    "admin/categories/:name": "countryCategory"
  },
  initialize: function (options) {
    _.bindAll(this, "index");

    this.appView = new AppView({router: this});

    this.appView.render();

    this.mainPageView = new MainPageView({router: this});
    this.contactsPageView = new ContactsPageView({router: this});
    this.feedbacksPageView = new FeedbacksPageView({router: this});
    this.galleryPageView = new GalleryPageView({router: this});
    this.galleryCountryPageTmp = new GalleryCountryPageTmp({router: this});

  },
  index: function () {
    this.mainPageView.render();
  },
  contacts: function () {
    this.contactsPageView.render();
  },
  feedbacks: function () {
    this.feedbacksPageView.render();
  },
  categories: function() {
    this.galleryPageView.render();
  },
  countryCategory: function (name) {
    this.galleryCountryPageTmp.render(name);
  }
});

module.exports = Router;