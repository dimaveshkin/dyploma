var Backbone = require("backbone");
Backbone.$ = window.$;

var nextToursViewTmp = require("./templates/NextToursViewTmp.hbs");

var NextToursView = Backbone.View.extend({
    el: ".next-tours",
    template: nextToursViewTmp,
    initialize: function () {

    },
    render: function (){
        this.$el.html(this.template());
    }
});

module.exports = NextToursView;