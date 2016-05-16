var Backbone = require("backbone");
var _ = require("underscore");
Backbone.$ = window.$;

var appTmp = require("./templates/AppViewTmp.hbs");

var AppView = Backbone.View.extend({
  el: "body",
  template: appTmp,
  events: {
    "click #contacts": "navContacts",
    "click #feedbacks": "navFeedbacks",
    "click #tours": "navTours",
    "click #categories": "navMain",
    "click #password": "navChangePass",
    "click #requests": "navRequests"
  },
  initialize: function (options) {
    this.router = options.router;
    _.bindAll(this, "navContacts", "navMain", "navFeedbacks");
  },
  render: function () {
    this.$el.html(this.template());
  },
  navMain: function (e) {
    e.preventDefault();
    this.router.navigate("/admin", {trigger: true});
  },
  navContacts: function (e) {
    e.preventDefault();
    this.router.navigate("/admin/contacts", {trigger: true});
  },
  navFeedbacks: function (e) {
    e.preventDefault();
    this.router.navigate("/admin/feedbacks", {trigger: true});
  },
  navChangePass: function(e) {
    e.preventDefault();
    this.router.navigate("/admin/password", {trigger: true});
  },
  navTours: function(e) {
    e.preventDefault();
    this.router.navigate("/admin/tours", {trigger: true});
  },
  navRequests: function (e) {
    e.preventDefault();
    this.router.navigate("/admin/requests", {trigger: true});
  }
});

module.exports = AppView;