var Backbone = require("backbone");
var _ = require("underscore");
Backbone.$ = window.$;

var footerTmp = require("./templates/FooterTml.hbs");

var FooterView = Backbone.View.extend({
    el: ".footer",
    template: footerTmp,

    initialize: function () {
    },
    render: function () {
        var self = this;

        $.get('/api/socials', function (socials) {
            self.$el.html(self.template(socials[0]));
        });

    }
});

module.exports = FooterView;