var Backbone = require("backbone");
Backbone.$ = window.$;
var _ = require("underscore");
var swal = require("sweetalert");
var countryGalleryPageTmp = require("./templates/CountryGalleryPageTmp.hbs");

var CountryGalleryPageView = Backbone.View.extend({
    el: ".main",
    template: countryGalleryPageTmp,
    initialize: function (options) {
        this.router = options.router;
        _.bindAll(this, "render");
    },
    render: function (countryName){
      $('.item-active').removeClass('item-active');
      $('#nav-gallery').addClass('item-active');

        var that = this;
        this.$el.removeClass("grey-background-after no-head-img");

        $.get("/api/gallery/country/" + countryName, function (photos) {
            if(photos.code == 500) {
                that.router.navigate("/404", {trigger: true});
                swal("Ошибка", photos.error);
                return;
            }
            that.$el.html(that.template({photos: photos.list, countryName: photos.list[0].name}));

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