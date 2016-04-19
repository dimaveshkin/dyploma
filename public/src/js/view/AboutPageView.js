var Backbone = require("backbone");
Backbone.$ = window.$;

var aboutPageTmp = require("./templates/AboutPageViewTmp.hbs");

var AboutPageView = Backbone.View.extend({
    el: ".main",
    template: aboutPageTmp,
    initialize: function (options) {
        this.router = options.router;
    },
    render: function () {
        this.$el.removeClass("grey-background-after");
        this.$el.html(this.template());
    },
    events: {
        "submit #feedback-form ": "sendFeedback"
    },
    sendFeedback: function (e) {
        e.preventDefault();
    }
});

module.exports = AboutPageView;