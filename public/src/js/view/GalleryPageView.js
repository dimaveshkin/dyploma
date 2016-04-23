var Backbone = require("backbone");
Backbone.$ = window.$;

var galleryPageTmp = require("./templates/GalleryContainerPageViewTmp.hbs");
var countriesListTmp = require("./templates/CountriesGalleryListTmp.hbs");
var bestListTmp = require("./templates/BestPhotoGalleryListTmp.hbs");
var allListTmp = require("./templates/PhotoGalleryListTmp.hbs");

var GalleryPageView = Backbone.View.extend({
    el: ".main",
    template: galleryPageTmp,
    initialize: function (options) {
        this.router = options.router;
    },
    render: function () {
        var that = this;
        $('.item-active').removeClass('item-active');
        $('#nav-gallery').addClass('item-active');

        this.$el.html(this.template());
        $.get("/api/gallery/getGallery", function (gallery) {
            $('.cities-gallery').html(countriesListTmp({countries: gallery.counties}));
            $('.best-gallery').html(bestListTmp({best: gallery.best}));
            $('.all-gallery').html(allListTmp({all: gallery.all}));

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

            var slidersOpt = {
                minSlides: 4,
                maxSlides: 4,
                slideWidth: 1000,
                slideMargin: 16,
                pager: false,
                adaptiveHeight: true,
                preloadImages: "visible"
            };

            var citiesSlider = $('.cities-gallery').bxSlider(slidersOpt),
                bestSlider = $('.best-gallery').bxSlider(slidersOpt),
                allSlider = $('.all-gallery').bxSlider(slidersOpt);


            $('.show-all-cities').on('click', function () {
                toggleGallery(this, citiesSlider);
            });

            $('.show-all-best').on('click', function () {
                toggleGallery(this, bestSlider);
            });
            $('.show-all-img').on('click', function () {
                toggleGallery(this, allSlider);
            });

            $('.country-gallery-link').on('click', function (e) {
                e.preventDefault();
                that.router.navigate("gallery/" + $(e.currentTarget).data("countryname"), {trigger: true});
            });

            function toggleGallery(element, slider) {
                if ($(element).prev().hasClass('images-gallery')) {
                    $(element).prev().removeClass('images-gallery');
                    slider.bxSlider(slidersOpt);
                    $(element).text('Показать все');

                } else {
                    slider.destroySlider();
                    $(element).prev().addClass('images-gallery');
                    $(element).text('Скрыть');
                }
            }


        });
    }
});

module.exports = GalleryPageView;