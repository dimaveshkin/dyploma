var Backbone = require("backbone");
var _ = require("underscore");
Backbone.$ = window.$;

var appTmp = require("./templates/AppViewTmp.hbs");

var AppView = Backbone.View.extend({
  el: "body",
  template: appTmp,
  events: {
    "click #password": "navMain",
    "click #contacts": "navContacts",
    "click #feedbacks": "navFeedbacks",
    "click #categories": "navCategories"
  },
  initialize: function (options) {
    this.router = options.router;
    _.bindAll(this, "navContacts", "navMain", "navFeedbacks", "navCategories");
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
  navCategories: function(e) {
    e.preventDefault();
    this.router.navigate("/admin/categories", {trigger: true});
  }
});

module.exports = AppView;