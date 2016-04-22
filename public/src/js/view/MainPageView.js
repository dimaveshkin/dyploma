var Backbone = require("backbone");
Backbone.$ = window.$;

var mainPageTmp = require("./templates/MainPageTmp.hbs");

var MainPageView = Backbone.View.extend({
    el: ".main",
    template: mainPageTmp,
    initialize: function () {

    },
    render: function (){
        this.$el.addClass("grey-background-after");

        this.$el.html(this.template());

        var slider = $('#gallery').bxSlider({
            pager: false,
            mode: 'fade',
            autoStart: true,
            auto: true,
            default: 1500,
            onSlideAfter: function() {
                slider.startAuto();
            }
        });
    }
});

module.exports = MainPageView;