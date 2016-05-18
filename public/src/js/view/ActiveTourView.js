var Backbone = require("backbone");
var _ = require("underscore");
Backbone.$ = window.$;
var EventBus = require("../helpers/EventBus");

var activeTourViewTmp = require("./templates/ActiveTourViewTmp.hbs");

var ActiveTourView = Backbone.View.extend({
    el: ".active-tour",
    template: activeTourViewTmp,
    initialize: function (options) {
        _.bindAll(this, "showTourDetails");
        this.router = options.router;
    },
    events: {
        "click .active-tour-btn": "showTourDetails"
    },
    render: function (){
        var that = this;
        $.get("/api/tours/active", function (tour) {
            that.tour = tour;
            that.$el.html(that.template(tour));
        });
    },
    showTourDetails: function () {
        this.router.navigate("tours/" + this.tour.id, {trigger: true});
    }
});

module.exports = ActiveTourView;