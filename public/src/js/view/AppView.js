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
        "click #nav-gallery": "navGallery",
        "click #nav-about": "navAbout"
    },
    initialize: function (options) {
        this.router = options.router;
        _.bindAll(this, "navGallery", "navMain", "navAbout");
    },
    render: function () {
        this.$el.html(this.template());
    },
    navMain: function (e) {
        e.preventDefault();
        this.router.navigate("", {trigger: true});
    },
    navGallery: function (e) {
        e.preventDefault();
        this.router.navigate("gallery", {trigger: true});
    },
    navAbout: function (e) {
        e.preventDefault();
        this.router.navigate("about", {trigger: true});
    }
});

module.exports = AppView;