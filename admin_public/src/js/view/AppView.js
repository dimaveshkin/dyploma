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
    "click #feedbacks": "navFeedbacks"
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
    this.router.navigate("/admin", {trigger: true});
  },
  navContacts: function (e) {
    e.preventDefault();
    this.router.navigate("/admin/contacts", {trigger: true});
  },
  navFeedbacks: function (e) {
    e.preventDefault();
    this.router.navigate("/admin/feedbacks", {trigger: true});
  }
});

module.exports = AppView;