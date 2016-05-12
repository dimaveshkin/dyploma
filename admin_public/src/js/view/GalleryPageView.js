var Backbone = require("backbone");
Backbone.$ = window.$;

var galleryPageTmp = require("./templates/GalleryPageTmp.hbs");
var swal = require("sweetalert");

var GalleryPageView = Backbone.View.extend({
    el: ".dashboard",
    template: galleryPageTmp,
    initialize: function (options) {
        this.router = options.router;
    },
    render: function () {
        var that = this;

        $.get("/api/gallery/countries", function (countries) {
            that.$el.html(that.template({countries: countries}));

            $('.country-gallery-link').on('click', function (e) {
                e.preventDefault();
                console.log($(e.currentTarget).data("countryname"));
                that.router.navigate("admin/categories/" + $(e.currentTarget).data("countryname"), {trigger: true});
                //that.router.navigate("gallery/" + $(e.currentTarget).data("countryname"), {trigger: true});
            });

            $('.delete-country').on('click', function (e) {
                var countryItem = $(e.currentTarget).closest('li');
                swal({
                    title: "Удалить альбом",
                    text: "Вы действительно хотите безворвзратно удалить альбом?",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Удалить",
                    cancelButtonText: "Отмена",
                    closeOnConfirm: true,
                    closeOnCancel: true
                }, function () {
                    //FIXME: isnt working
                    $.get("/api/gallery/country/remove/" + countryItem.data("countryname")).done(function (response) {
                        if (response.code === 200) {
                            countryItem.remove();
                        } else {
                            swal("Ошибка", response.message);
                        }
                    });
                });
                //that.router.navigate("categories/" + $(e.currentTarget).data("countryname"), {trigger: true});

                e.preventDefault();
                e.stopPropagation();
            });
        });
    }
});

module.exports = GalleryPageView;