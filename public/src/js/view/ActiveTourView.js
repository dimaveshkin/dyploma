var Backbone = require("backbone");
var _ = require("underscore");
Backbone.$ = window.$;
var EventBus = require("../helpers/EventBus");

var activeTourViewTmp = require("./templates/ActiveTourViewTmp.hbs");

var ActiveTourView = Backbone.View.extend({
    el: ".selected-tour",
    template: activeTourViewTmp,
    initialize: function (options) {
        _.bindAll(this, "showTourDetails");
        this.router = options.router;
        EventBus.on("prevtour:select nexttour:select", this.render, this)
    },
    events: {
        "click .active-tour-btn": "showTourDetails"
    },
    render: function (tour){
        this.tour = tour;
        this.$el.html(this.template(tour));
    },
    showTourDetails: function () {
        this.router.navigate("tours/" + this.tour.id, {trigger: true});
    }
});

module.exports = ActiveTourView;