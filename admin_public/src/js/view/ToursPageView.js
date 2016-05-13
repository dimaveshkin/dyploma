var Backbone = require("backbone");
var _ = require("underscore");
Backbone.$ = window.$;

var toursPageTmp = require("./templates/ToursPageTmp.hbs");
var ToursItemView = require("./TourItemView");
var swal = require("sweetalert");

var ToursPageView = Backbone.View.extend({
    el: ".dashboard",
    template: toursPageTmp,
    initialize: function (options) {
        _.bindAll(this, "getAndRenderTours", "toggleNextTours", "togglePrevTours");
        this.router = options.router;
        this.prevTours = [];
        this.nextTours = [];
    },
    events: {
        "click .next-tours-header": "toggleNextTours",
        "click .prev-tours-header": "togglePrevTours"
    },
    render: function () {
        var $prevList, $nextList, $prevHeader, $nextHeader;
        this.$el.html(this.template());

        $prevList = this.$el.find("#prev-tours-list");
        $nextList = this.$el.find("#next-tours-list");
        $prevHeader = this.$el.find(".prev-tour-header");
        $nextHeader = this.$el.find(".next-tour-header");

        this.getAndRenderTours("/api/tours/prev", $prevList, this.prevTours);
        this.getAndRenderTours("/api/tours/next", $nextList, this.nextTours);
    },
    getAndRenderTours: function (url, $el, tourArray) {
        var that = this;

        $.get(url, function (tours) {
            tours.forEach(function (tour) {
                var tourView = new ToursItemView({$parentList: $el, router: that.router, tour: tour});
                tourView.render();

                tourArray.push(tourView);
            });
        });
    },
    togglePrevTours: function () {
        this.prevTours.forEach(function (tourView) {
            tourView.toggle();
        });
    },
    toggleNextTours: function () {
        this.nextTours.forEach(function (tourView) {
            tourView.toggle();
        });
    }
});

module.exports = ToursPageView;