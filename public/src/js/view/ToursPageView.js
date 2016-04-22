var Backbone = require("backbone");
Backbone.$ = window.$;
var swal = require("sweetalert");
var ToursPageViewTmp = require("./templates/ToursPageViewTmp.hbs");
var helpers = require('./templates/helpers/helpers');

var MapView = require("./MapView");
var TourRequestView = require("./TourRequestView");
var NextTourView = require("./NextToursView");
var PrevTourView = require("./PrevToursView");
var ActiveTourView = require("./ActiveTourView");

var ToursPageView = Backbone.View.extend({
    el: ".main",
    template: ToursPageViewTmp,
    initialize: function (options) {
        this.router = options.router;
    },
    render: function (id){
        this.$el.removeClass("grey-background-after");

        this.$el.html(this.template());

        this.mapView = new MapView();
        this.tourRequestView = new TourRequestView();
        this.nextToursView = new NextTourView();
        this.prevToursView = new PrevTourView();
        this.activeTourView = new ActiveTourView({router: this.router});

        this.mapView.render();
        this.tourRequestView.render();
        this.nextToursView.render();
        this.prevToursView.render();
        this.activeTourView.render();
    }
});

module.exports = ToursPageView;