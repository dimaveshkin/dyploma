var Backbone = require("backbone");
var _ = require("underscore");
Backbone.$ = window.$;

var AppView = require("../view/AppView");
var MainPageView = require("../view/MainPageView");
var ContactsPageView = require("../view/ContactsPageView");
var FeedbacksPageView = require("../view/FeedbacksPageView");

var Router = Backbone.Router.extend({
  routes: {
    "admin": "index",
    "admin/contacts": "contacts",
    "admin/feedbacks": "feedbacks"
  },
  initialize: function (options) {
    _.bindAll(this, "index");

    this.appView = new AppView({router: this});

    this.appView.render();

    this.mainPageView = new MainPageView({router: this});
    this.contactsPageView = new ContactsPageView({router: this});
    this.feedbacksPageView = new FeedbacksPageView({router: this});

  },
  index: function () {
    this.mainPageView.render();
  },
  contacts: function () {
    this.contactsPageView.render();
  },
  feedbacks: function () {
    this.feedbacksPageView.render();
  }
});

module.exports = Router;