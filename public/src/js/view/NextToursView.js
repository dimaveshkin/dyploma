var Backbone = require("backbone");
var _ = require("underscore");
Backbone.$ = window.$;

var nextToursViewTmp = require("./templates/NextToursViewTmp.hbs");

var NextToursView = Backbone.View.extend({
    el: ".next-tours",
    template: nextToursViewTmp,
    initialize: function () {
        this.slidersOpt = {
            minSlides: 3,
            maxSlides: 3,
            slideMargin: 16,
            slideWidth: 1000,
            pager: false,
            responsive: true,
            adaptiveHeight: true
        };
    },
    render: function (){
        var that = this;

        $.get("/api/tours/next", function (tours) {
            var years = _.map(tours, function (tour) {
                var date = new Date(tour.startDate);

                return date.getFullYear();
            });

            years = _.uniq(years);
            years = years.sort();

            that.$el.html(that.template({years: years, tours: tours}));

            $(".next-tours-gallery").bxSlider(that.slidersOpt);
        });
    }
});

module.exports = NextToursView;