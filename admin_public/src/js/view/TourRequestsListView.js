var Backbone = require("backbone");
Backbone.$ = window.$;
var _ = require("underscore");
var TourRequestListTmp = require("./templates/TourRequestListTmp.hbs");
//var helpers = require("./templates/helpers/helpers");

var TourRequestListView = Backbone.View.extend({
    el: ".dashboard",
    template: TourRequestListTmp,
    initialize: function (options) {
        this.router = options.router;
        _.bindAll(this, "render");
    },
    events: {
        //"click tbody tr": "showRequest"
    },
    render: function (id) {
        var that = this;

        $.get('/api/tours/requests/' + id , function (requests) {
            that.$el.html(that.template({requests: requests}));
        });

    }
});

module.exports = TourRequestListView;