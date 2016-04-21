var Backbone = require("backbone");
Backbone.$ = window.$;

var activeTourViewTmp = require("./templates/ActiveTourViewTmp.hbs");

var ActiveTourView = Backbone.View.extend({
    el: ".selected-tour",
    template: activeTourViewTmp,
    initialize: function () {

    },
    render: function (){
        this.$el.html(this.template());
    }
});

module.exports = ActiveTourView;