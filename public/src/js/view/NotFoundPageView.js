var Backbone = require("backbone");
Backbone.$ = window.$;

var notFoundPageTmp = require("./templates/NotFoundPageTmp.hbs");

var NotFoundPageView = Backbone.View.extend({
    el: ".main",
    template: notFoundPageTmp,
    initialize: function () {

    },
    render: function (){
        this.$el.html(this.template());
    }
});

module.exports = NotFoundPageView;