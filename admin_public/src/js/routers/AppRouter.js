var Backbone = require("backbone");
var _ = require("underscore");
Backbone.$ = window.$;

var AppView = require("../view/AppView");
var MainPageView = require("../view/MainPageView");
var ContactsPageView = require("../view/ContactsPageView");

var Router = Backbone.Router.extend({
  routes: {
    "": "index",
    "contacts": "contacts"
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