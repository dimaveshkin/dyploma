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
            if(socials.code !== 500) {
                self.$el.html(self.template(socials[0]));
            } else {
                swal("Ошибка", socials.message);
            }
        });

    }
});

module.exports = FooterView;