var Backbone = require("backbone");
var _ = require("underscore");
var EventBus = require("../helpers/EventBus");
Backbone.$ = window.$;

var prevToursViewTmp = require("./templates/PrevToursViewTmp.hbs");

var PrevToursView = Backbone.View.extend({
    el: ".prev-tours",
    template: prevToursViewTmp,
    events: {
        "click .city-item": "selectTour",
        "click .year-link": "filterYear"
    },
    initialize: function () {
        _.bindAll(this, "selectTour", "renderTours", "loadFromAjax", "filterYear");

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
    render: function (tours) {
        var that = this;

        if (tours) {
            this.renderTours(tours);
        } else {
            $.get("/api/tours/prev", this.loadFromAjax);
        }
    },
    loadFromAjax: function (tours) {
        this.tours = _.map(tours, function (tour) {
            var date = new Date(tour.startDate);
            tour.startYear = date.getFullYear();

            return tour;
        });

        var years = _.map(tours, function (tour) {
            var date = new Date(tour.startDate);

            return date.getFullYear();
        });

        this.years = _.uniq(years).sort();

        EventBus.trigger("prevtour:load", this.tours);

        this.renderTours(tours);
    },
    renderTours: function (tours) {
        this.$el.html(this.template({years: this.years, tours: tours}));
        this.$el.find(".year-link[data-year='"+ this.chosenYear +"']").addClass("active");
        $(".prev-tours-gallery").bxSlider(this.slidersOpt);
    },
    filterYear: function (e) {
        var chosenYear = $(e.currentTarget).data("year");

        if (chosenYear === this.chosenYear) {
            this.chosenYear = null;
            this.renderTours(this.tours);
        } else {
            var filteredTours = _.filter(this.tours, function (tour) {
                return tour.startYear === chosenYear;
            });
            this.chosenYear = chosenYear;
            this.renderTours(filteredTours);
        }
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