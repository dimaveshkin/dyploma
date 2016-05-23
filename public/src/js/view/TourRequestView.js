var Backbone = require("backbone");
var swal = require("sweetalert");
var _ = require("underscore");
var helpers = require('./templates/helpers/helpers');
var validator = require("./templates/helpers/validator");
var EventBus = require("../helpers/EventBus");
Backbone.$ = window.$;

var tourRequestViewTmp = require("./templates/TourRequestViewTmp.hbs");

var TourRequestView = Backbone.View.extend({
    el: ".request",
    template: tourRequestViewTmp,
    initialize: function () {
        _.bindAll(this, "render", "sendRequest", "renderEmpty");

        EventBus.on("nexttour:select", this.render);
        EventBus.on("prevtour:select", this.renderEmpty);
    },
    render: function (tour){
        this.$el.html(this.template({tour: tour}));

        if(tour) {
            this.id = tour.id;
        } else {
            this.id = null;
        }
    },
    renderEmpty: function () {
        this.render();
    },
    events: {
        "submit #tour-request": "sendRequest"
    },
    sendRequest: function (e) {
        e.preventDefault();

        if(!this.id) {
            swal("Ошибка", "Вы не выбрали тур!", "error");
            return;
        }

        var name = $('#name'),
            email = $('#email'),
            text = $('#request-text'),
            isError = false;

        if (!validator(email, 'email')) {
            isError = true;
        }

        if (!validator(name, 'text')) {
            isError = true;
        }

        if (!validator(text, 'text')) {
            isError = true;
        }
        if (!isError) {
            $.post("/api/tours/create/new", ($('#tour-request').serialize() + '&tour_id=' + this.id))
                .done(function (data) {
                    if (!data.error) {
                        $('#tour-request')[0].reset();
                        swal("Спасибо", "Спасибо за Вашу заявку", "success");
                        $('.captcha').removeClass('error');
                        name.removeClass('js-valid');
                        text.removeClass('js-valid');
                        email.removeClass('js-valid');
                    } else {
                        $('.captcha').addClass('error');
                    }
                    $(".captcha-img").attr("src", "/captcha.png?" + (new Date()).getTime());
                });
        }
    }
});

module.exports = TourRequestView;