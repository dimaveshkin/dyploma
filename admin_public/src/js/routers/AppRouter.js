var Backbone = require("backbone");
var _ = require("underscore");
Backbone.$ = window.$;

var AppView = require("../view/AppView");
//var MainPageView = require("../view/MainPageView");
var MainPageView = require("../view/GalleryPageView");
var ContactsPageView = require("../view/ContactsPageView");
var FeedbacksPageView = require("../view/FeedbacksPageView");
var ChangePassPageView = require("../view/ChangePassPageView");
var GalleryCountryPageTmp = require("../view/GalleryCountryPageView");
var NewPhotoPageView = require("../view/NewPhotoPageView");
var ToursPageView = require("../view/ToursPageView");
var NewCountryPageView = require("../view/NewCountryPageView");
var TourEditCreateView = require("../view/TourEditCreateView");
var RequestsPageView = require("../view/RequestsPageView");
var TourRequestListView = require("../view/TourRequestsListView");

var Router = Backbone.Router.extend({
  routes: {
    "admin": "index",
    "admin/contacts": "contacts",
    "admin/feedbacks": "feedbacks",
    "admin/categories/new": "AddCategory",
    "admin/password": "password",
    "admin/requests/:id": "tourRequests",
    "admin/requests": "requests",
    "admin/tours": "tours",
    "admin/tours/:id": "tourEdit",
    "admin/categories/:id/add": "addPhoto",
    "admin/categories/:name": "countryCategory",
    "*NotFound": "notFound"
  },
  initialize: function (options) {
    _.bindAll(this, "index");

    this.appView = new AppView({router: this});

    this.appView.render();

    this.mainPageView = new MainPageView({router: this});
    this.contactsPageView = new ContactsPageView({router: this});
    this.feedbacksPageView = new FeedbacksPageView({router: this});
    this.changePassPageView = new ChangePassPageView({router: this});
    this.galleryCountryPageTmp = new GalleryCountryPageTmp({router: this});
    this.newPhotoPageView = new NewPhotoPageView({router: this});
    this.toursPageView = new ToursPageView({router: this});
    this.tourEditCreateView = new TourEditCreateView({router: this});
    this.newCountryPageView = new NewCountryPageView({router: this});
    this.requestsPageView = new RequestsPageView({router: this});
    this.tourRequestListView = new TourRequestListView({router: this});
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
  password: function() {
    this.changePassPageView.render();
  },
  tours: function() {
    this.toursPageView.render();
  },
  tourEdit: function(id) {
    this.tourEditCreateView.render({ tourID: id, router: this });
  },
  countryCategory: function (name) {
    this.galleryCountryPageTmp.render(name);
  },
  notFound: function () {
    this.mainPageView.render();
  },
  addPhoto: function(id) {
    this.newPhotoPageView.render(id);
  },
  AddCategory: function () {
    this.newCountryPageView.render();
  },
  requests: function () {
    this.requestsPageView.render();
  },
  tourRequests: function(id) {
    this.tourRequestListView.render(id);
  }
});

module.exports = Router;