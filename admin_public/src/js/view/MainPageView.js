var Backbone = require("backbone");
Backbone.$ = window.$;

var mainPageTmp = require("./templates/MainPageTmp.hbs");

var MainPageView = Backbone.View.extend({
  el: ".dashboard",
  template: mainPageTmp,
  initialize: function () {

  },
  render: function (){
    this.$el.html(this.template());
  }
});

module.exports = MainPageView;