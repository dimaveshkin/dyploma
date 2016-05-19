var Backbone = require("backbone");
Backbone.$ = window.$;

var loginPageTmp = require("./templates/LoginPageTmp.hbs");

var LoginPageView = Backbone.View.extend({
    el: "body",
    template: loginPageTmp,
    initialize: function () {

    },
    render: function (){
        this.$el.removeClass("grey-background-after no-head-img");
        this.$el.html(this.template());
    }
});

module.exports = LoginPageView;