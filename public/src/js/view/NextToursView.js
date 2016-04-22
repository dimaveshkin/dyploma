var Backbone = require("backbone");
var _ = require("underscore");
var EventBus = require("../helpers/EventBus");
Backbone.$ = window.$;

var nextToursViewTmp = require("./templates/NextToursViewTmp.hbs");

var NextToursView = Backbone.View.extend({
    el: ".next-tours",
    template: nextToursViewTmp,
    events: {
        "click .city-item": "selectTour"
    },
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
            that.tours = _.sortBy(_.map(tours, function (tour) {
                var date = new Date(tour.startDate);
                tour.startYear = date.getFullYear();

                return tour;
            }), function (tour) {
                return tour.startYear
            });

            var years = _.map(tours, function (tour) {
                var date = new Date(tour.startDate);

                return date.getFullYear();
            });

            that.years = _.uniq(years).sort();

            EventBus.trigger("nexttour:load", that.tours);

            that.$el.html(that.template({years: that.years, tours: tours}));

            $(".next-tours-gallery").bxSlider(that.slidersOpt);
        });
    },
    selectTour: function (e) {
        var id = $(e.currentTarget).data("tourid");
        var tour = _.filter(this.tours, function (tour) {
            return tour.id === id;
        });

        EventBus.trigger("nexttour:select", tour[0]);
    }
});

module.exports = NextToursView;