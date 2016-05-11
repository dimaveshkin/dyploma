var Backbone = require("backbone");
Backbone.$ = window.$;

var galleryPageTmp = require("./templates/GalleryPageTmp.hbs");

var GalleryPageView = Backbone.View.extend({
    el: ".dashboard",
    template: galleryPageTmp,
    initialize: function (options) {
        this.router = options.router;
    },
    render: function () {
        var that = this;

        $.get("/api/gallery/countries", function (countries) {
            that.$el.html(that.template({countries:countries}));

            $('.country-gallery-link').on('click', function (e) {
                e.preventDefault();
                console.log($(e.currentTarget).data("countryname"));
                that.router.navigate("admin/categories/" + $(e.currentTarget).data("countryname"), {trigger: true});
                //that.router.navigate("gallery/" + $(e.currentTarget).data("countryname"), {trigger: true});
            });

            $('.delete-country').on('click', function (e) {
                console.log($(e.currentTarget).closest('li').data("countryname"));
                //that.router.navigate("categories/" + $(e.currentTarget).data("countryname"), {trigger: true});
            });
        });
    }
});

module.exports = GalleryPageView;