var Backbone = require("backbone");
var _ = require("underscore");
var EventBus = require("../helpers/EventBus");
Backbone.$ = window.$;

var prevToursViewTmp = require("./templates/PrevToursViewTmp.hbs");

var PrevToursView = Backbone.View.extend({
    el: ".prev-tours",
    template: prevToursViewTmp,
    events: {
        "click .city-item": "selectTour"
    },
    initialize: function () {
        _.bindAll(this, "selectTour");

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

        $.get("/api/tours/prev", function (tours) {
            that.tours = _.map(tours, function (tour) {
                var date = new Date(tour.startDate);
                tour.startYear = date.getFullYear();

                return tour;
            });

            var years = _.map(tours, function (tour) {
                var date = new Date(tour.startDate);

                return date.getFullYear();
            });

            that.years = _.uniq(years).sort();

            EventBus.trigger("prevtour:load", that.tours);

            that.$el.html(that.template({years: that.years, tours: tours}));

            $(".prev-tours-gallery").bxSlider(that.slidersOpt);
        });
    },
    selectTour: function (e) {
        var id = $(e.currentTarget).data("tourid");
        var tour = _.filter(this.tours, function (tour) {
            return tour.id === id;
        });
        
        EventBus.trigger("prevtour:select", tour[0]);
    }
});

module.exports = PrevToursView;