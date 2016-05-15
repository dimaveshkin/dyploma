var Backbone = require("backbone");
var _ = require("underscore");
Backbone.$ = window.$;

var toursEditTmp = require("./templates/TourEditTmp.hbs");
var toursCreateTmp = require("./templates/TourCreateTmp.hbs");
var swal = require("sweetalert");

var ToursEditCreateView = Backbone.View.extend({
    el: ".dashboard",
    initialize: function (options) {
        _.bindAll(this, "renderHTML");
        this.router = options.router;
        this.tourData = {};
    },
    events: {
    },
    render: function (options) {
        var url ="/api/tours/" + options.tourID,
            that = this;

        this.tourID = options.tourID;
        this.isCreating = !options.tourID;

        this.template = options.tourID ? toursEditTmp : toursCreateTmp;

        this.$el.html(this.template());

        if(!this.isCreating) {
            $.ajax(url).done(function (response) {
                if(response.code === 200) {
                    that.renderHTML(response.data);
                } else {
                    swal("Ошибка!", "Такой тур не найден!");
                }
            });
        } else {
            this.renderHTML({});
        }
    },
    renderHTML: function (tourData) {
        this.$el.html(this.template(tourData));
    }
});

module.exports = ToursEditCreateView;