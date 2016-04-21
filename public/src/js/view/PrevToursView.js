var Backbone = require("backbone");
Backbone.$ = window.$;

var prevToursViewTmp = require("./templates/PrevToursViewTmp.hbs");

var PrevToursView = Backbone.View.extend({
    el: ".next-tours",
    template: prevToursViewTmp,
    initialize: function () {

    },
    render: function (){
        this.$el.html(this.template());
    }
});

module.exports = PrevToursView;