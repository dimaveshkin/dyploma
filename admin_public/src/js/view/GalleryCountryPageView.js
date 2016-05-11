var Backbone = require("backbone");
Backbone.$ = window.$;

var galleryPageTmp = require("./templates/GalleryCountryPageTmp.hbs");

var GalleryPageView = Backbone.View.extend({
    el: ".dashboard",
    template: galleryPageTmp,
    initialize: function (options) {
        this.router = options.router;
    },
    render: function (countryName){
        //$('.item-active').removeClass('item-active');
        //$('#nav-gallery').addClass('item-active');

        var that = this;
        //this.$el.removeClass("grey-background-after");

        $.get("/api/gallery/country/" + countryName, function (photos) {
            that.$el.html(that.template({photos: photos, countryName: photos[0].name}));

            $(".fancybox").fancybox({
                prevEffect	: 'none',
                nextEffect	: 'none',
                helpers	: {
                    title	: {
                        type: 'outside'
                    }
                },
                beforeShow : function() {
                    this.title = (this.title ? '' + this.title + '' : '') + ' <span class="num">' + (this.index + 1) + ' / ' + this.group.length + ' </span>';
                }
            });
        });
    }
});

module.exports = GalleryPageView;