var Backbone = require("backbone");
Backbone.$ = window.$;

var mainPageTmp = require("./templates/ContactsPageTpm.hbs");

var ContactsPageView = Backbone.View.extend({
  el: ".dashboard",
  template: mainPageTmp,
  initialize: function () {

  },
  render: function (){
    this.$el.html(this.template());
  }
});

module.exports = ContactsPageView;