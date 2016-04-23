var Backbone = require("backbone");
Backbone.$ = window.$;

var countryGalleryPageTmp = require("./templates/CountryGalleryPageTmp.hbs");

var CountryGalleryPageView = Backbone.View.extend({
    el: ".main",
    template: countryGalleryPageTmp,
    initialize: function () {

    },
    render: function (countryName){
      $('.item-active').removeClass('item-active');
      $('#nav-gallery').addClass('item-active');

        var that = this;
        this.$el.removeClass("grey-background-after");

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

module.exports = CountryGalleryPageView;