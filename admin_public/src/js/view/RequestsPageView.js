var Backbone = require("backbone");
Backbone.$ = window.$;
var _ = require("underscore");
var requestsPageTmp = require("./templates/RequestsPageTmp.hbs");
var helpers = require("./templates/helpers/helpers");

var RequestsPageView = Backbone.View.extend({
    el: ".dashboard",
    template: requestsPageTmp,
    initialize: function (options) {
        this.router = options.router;
        _.bindAll(this, "render");
    },
    events: {
        "click tbody .tour-item": "showRequest"
    },
    render: function () {
        var that = this;

        $.get('/api/tours/requests', function (tours) {
            that.$el.html(that.template({tours: tours}));
        });

    },
    showRequest: function (e) {
        var id = $(e.target).closest('tr').attr("data-tour-id");
        this.router.navigate("/admin/requests/" + id, {trigger: true});
    }
});

module.exports = RequestsPageView;