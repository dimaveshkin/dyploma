var Backbone = require("backbone");
var _ = require("underscore");
Backbone.$ = window.$;

var appTmp = require("./templates/AppViewTmp.hbs");
var MainPageView = require("./MainPageView");

var AppView = Backbone.View.extend({
    el: "body",
    template: appTmp,
    events: {
        "click #nav-main": "navMain",
        "click #nav-gallery": "navGallery"
    },
    initialize: function (options) {
        this.router = options.router;
    },
    render: function () {
        this.$el.html(this.template());
    },
    navMain: function () {
        this.router.navigate("", {trigger: true});
    },
    navGallery: function () {
        this.router.navigate("gallery", {trigger: true});
    }
});

module.exports = AppView;