var Backbone = require("backbone");
Backbone.$ = window.$;

var tourRequestViewTmp = require("./templates/TourRequestViewTmp.hbs");

var TourRequestView = Backbone.View.extend({
    el: ".request",
    template: tourRequestViewTmp,
    initialize: function () {

    },
    render: function (){
        this.$el.html(this.template());
    }
});

module.exports = TourRequestView;