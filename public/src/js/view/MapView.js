var Backbone = require("backbone");
Backbone.$ = window.$;

var mapViewTmp = require("./templates/MapViewTmp.hbs");

var NotFoundPageView = Backbone.View.extend({
    el: ".map",
    template: mapViewTmp,
    initialize: function () {

    },
    render: function (){
        this.$el.html(this.template());

        this.map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: -34.397, lng: 150.644},
            zoom: 1
        });
    }
});

module.exports = NotFoundPageView;