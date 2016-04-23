var Backbone = require("backbone");
var _ = require("underscore");
var EventBus = require("../helpers/EventBus");
Backbone.$ = window.$;

var appTmp = require("./templates/AppViewTmp.hbs");

var AppView = Backbone.View.extend({
  el: "body",
  template: appTmp,
  events: {
    "click #password": "navMain",
    "click #contacts": "navContacts"
  },
  initialize: function (options) {
    this.router = options.router;
    _.bindAll(this, "navContacts", "navMain");
  },
  render: function () {
    this.$el.html(this.template());
  },
  navMain: function (e) {
    e.preventDefault();
    this.router.navigate("", {trigger: true});
  },
  navContacts: function (e) {
    e.preventDefault();
    this.router.navigate("contacts", {trigger: true});
  }
});

module.exports = AppView;