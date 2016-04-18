var Backbone = require("backbone");
Backbone.$ = window.$;

var galleryPageTmp = require("./templates/GalleryPageViewTmp.hbs");

var GalleryPageView = Backbone.View.extend({
    el: ".main",
    template: galleryPageTmp,
    initialize: function () {

    },
    render: function () {
        this.$el.html(this.template());

        var slidersOpt = {
            minSlides: 4,
            maxSlides: 4,
            slideWidth: 1000,
            slideMargin: 16,
            pager: false,
            adaptiveHeight: true
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


        $('.slider-img').on('click', function () {
            $('.popup, .overlay, .close-popup').addClass('js-show');

        });

        $(this).keydown(function (eventObject) {
            if (eventObject.which == 27) {
                closePopUp();
            }
        });

        $('/*.overlay, */.close-popup').on('click', function () {
            closePopUp();
        });


        function closePopUp() {
            $('.popup, .overlay, .close-popup').removeClass('js-show');
        }

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

        $('.popup-slider').bxSlider({
            pager: false,
            mode: 'fade',
            adaptiveHeight: true,
            captions: true,
            onSliderLoad: function(newIndex) {
                var slidesCount = $('.popup-slider li').length;

                $('.total-slides').text(slidesCount);
                $('.current-slide').text(newIndex + 1);
            },
            onSlideBefore: function($slideElement, oldIndex, newIndex){
                $('.current-slide').text(newIndex + 1);
            }
        });

    }
});

module.exports = GalleryPageView;