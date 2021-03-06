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
        "click .prev-tours-header": "togglePrevTours",
        "click #new-tour-btn": "newTour"
    },
    render: function () {
        $('.active').removeClass('active');
        $('#tours').addClass('active');

        var $prevList, $nextList, $prevHeader, $nextHeader;
        this.$el.html(this.template());

        this.$prevList = this.$el.find("#prev-tours-list");
        this.$nextList = this.$el.find("#next-tours-list");
        this.$prevHeader = this.$el.find(".prev-tours-header");
        this.$nextHeader = this.$el.find(".next-tours-header");

        this.getAndRenderTours("/api/tours/prev", this.$prevList, this.prevTours);
        this.getAndRenderTours("/api/tours/next", this.$nextList, this.nextTours);
    },
    getAndRenderTours: function (url, $el, tourArray) {
        var that = this;

        $.get(url, function (tours) {
            if(tours.code !== 500) {
                tours.forEach(function (tour) {
                    var tourView = new ToursItemView({$parentList: $el, router: that.router, tour: tour});
                    tourView.render();

                    tourArray.push(tourView);
                });
            } else {
                swal("Ошибка", response.error);
            }
        });
    },
    togglePrevTours: function () {
        this.prevTours.forEach(function (tourView) {
            tourView.toggle();
        });

        this.$prevHeader.toggleClass("hidden");
    },
    toggleNextTours: function () {
        this.nextTours.forEach(function (tourView) {
            tourView.toggle();
        });

        this.$nextHeader.toggleClass("hidden");
    },
    newTour: function (e) {
        e.stopPropagation();
    }
});

module.exports = ToursPageView;