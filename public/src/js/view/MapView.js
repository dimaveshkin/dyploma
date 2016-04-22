var Backbone = require("backbone");
var _ = require("underscore");
var EventBus = require("../helpers/EventBus");
Backbone.$ = window.$;

var mapViewTmp = require("./templates/MapViewTmp.hbs");

var NotFoundPageView = Backbone.View.extend({
    el: ".map",
    template: mapViewTmp,
    initialize: function () {
        _.bindAll(this, "renderPrevToursMarkers", "renderNextToursMarkers", "toggleNextMarkers", "togglePrevMarkers", "toggleMarkers");
        this.prevMarkers = [];
        this.nextMarkers = [];
        this.bounds = new google.maps.LatLngBounds();
    },
    events: {
        "change #prev-filter": "togglePrevMarkers",
        "change #next-filter": "toggleNextMarkers"
    },
    render: function (){
        this.$el.html(this.template());

        this.map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: -34.397, lng: 150.644},
            zoom: 1,
            disableDefaultUI: true
        });

        EventBus.on("nexttour:load", this.renderNextToursMarkers);
        EventBus.on("prevtour:load", this.renderPrevToursMarkers);
    },
    togglePrevMarkers: function (e) {
        this.toggleMarkers(e, this.prevMarkers);
    },
    markerChangeFunc: function (value) {
        return function (marker) {
            marker.setMap(value);
        }
    },
    toggleMarkers: function (e, markers) {
        var value;
        if(e.currentTarget.checked){
            value = this.map;
            $("label[for='"+ e.currentTarget.id +"']").addClass("active");
        } else {
            value = null;
            $("label[for='"+ e.currentTarget.id +"']").removeClass("active");
        }

        _.forEach(markers, this.markerChangeFunc(value));
    },
    toggleNextMarkers: function (e) {
        this.toggleMarkers(e, this.nextMarkers);
    },
    renderPrevToursMarkers: function (tours) {
        this.prevMarkers = [];
        this.renderMarkers(tours, false);
    },
    renderNextToursMarkers: function (tours) {
        this.nextMarkers = [];
        this.renderMarkers(tours, true);
    },
    renderMarkers: function (tours, isActive) {
        _.forEach(tours, function (tour) {
            var image, marker, latlng;

            if(isActive) {
                image = "/images/bull-green.png";
            } else {
                image = "/images/bull-yellow.png";
            }

            //TODO: change to normal lng lat
            latlng = {
                lat: Number(tour.longitude),
                lng: Number(tour.latitude)
            };

            marker = new google.maps.Marker({
                position: latlng,
                map: this.map,
                title: tour.title,
                icon: image
            });

            marker.addListener('click', function() {
                if(isActive) {
                    EventBus.trigger("nexttour:select", tour);
                } else {
                    EventBus.trigger("prevtour:select", tour);
                }
            });

            if(isActive) {
                this.nextMarkers.push(marker);
            } else {
                this.prevMarkers.push(marker);
            }

            this.bounds.extend(new google.maps.LatLng(latlng));
        }, this);

        this.map.fitBounds(this.bounds);
    }
});

module.exports = NotFoundPageView;