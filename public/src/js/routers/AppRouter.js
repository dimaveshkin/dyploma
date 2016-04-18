var Backbone = require("backbone");
var $ = require("jquery")(window);
Backbone.$ = $;

var AppView = require("../view/AppView");
var GalleryPageView = require("../view/GalleryPageView");
var MainPageView = require("../view/MainPageView");

var Router = Backbone.Router.extend({
    routes: {
        "": "index",
        "gallery": "gallery",
        "tours": "tours"
    },
    initialize: function (options) {
        this.appView = new AppView({router: this});
        this.appView.render();

        this.mainPageView = new MainPageView({router: this});
        this.galleryPageView = new GalleryPageView({router: this});
    },
    index: function () {
        this.mainPageView.render();
    },
    gallery: function () {
        this.galleryPageView.render();
    },
    tours: function () {
        
    }
});

module.exports = Router;