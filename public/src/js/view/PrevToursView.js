var Backbone = require("backbone");
var _ = require("underscore");
Backbone.$ = window.$;

var prevToursViewTmp = require("./templates/PrevToursViewTmp.hbs");

var PrevToursView = Backbone.View.extend({
    el: ".prev-tours",
    template: prevToursViewTmp,
    initialize: function () {
        this.slidersOpt = {
            minSlides: 3,
            maxSlides: 3,
            slideMargin: 16,
            slideWidth: 1000,
            pager: false,
            responsive: true,
            adaptiveHeight: true
        };
    },
    render: function (){
        var that = this;

        $.get("/api/tours/prev", function (tours) {
            var years = _.map(tours, function (tour) {
                var date = new Date(tour.startDate);

                return date.getFullYear();
            });

            years = _.uniq(years);
            years = years.sort();

            that.$el.html(that.template({years: years, tours: tours}));

            $(".prev-tours-gallery").bxSlider(that.slidersOpt);
        });
    }
});

module.exports = PrevToursView;