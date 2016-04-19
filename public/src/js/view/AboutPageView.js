var Backbone = require("backbone");
Backbone.$ = window.$;
var swal = require("sweetalert");
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
        "submit #feedback-form": "sendFeedback"
    },
    sendFeedback: function (e) {
        $.post("api/feedback/add", $('#feedback-form').serialize())
            .done(function (data) {
                if(!data.error) {
                    $('#feedback-form')[0].reset();
                  swal("Спасибо", "Спасибо за Ваше сообщение", "success");
                } else {
//                    alert(data.error)
                  swal("Ошибка", data.error, "error");
                }
            });
        e.preventDefault();
    }
});

module.exports = AboutPageView;