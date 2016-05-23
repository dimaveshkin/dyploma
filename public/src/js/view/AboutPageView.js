var Backbone = require("backbone");
Backbone.$ = window.$;
var swal = require("sweetalert");
var aboutPageTmp = require("./templates/AboutPageViewTmp.hbs");
var validator = require("./templates/helpers/validator");

var AboutPageView = Backbone.View.extend({
    el: ".main",
    template: aboutPageTmp,
    initialize: function (options) {
        this.router = options.router;
    },
    render: function () {
        $('.item-active').removeClass('item-active');
        $('#nav-about').addClass('item-active');
        this.$el.removeClass("grey-background-after no-head-img");
        this.$el.html(this.template());
    },
    events: {
        "submit #feedback-form": "sendFeedback"
    },
    sendFeedback: function (e) {
        e.preventDefault();
        var name = $('#name'),
            email = $('#email'),
            text = $('#feedback'),
            isError = false;

        if(!validator(email, 'email')){
            isError = true;
        }

        if(!validator(name, 'text')){
            isError = true;
        }

        if(!validator(text, 'text')){
            isError = true;
        }

        if(!isError) {
            $.post("api/feedback/add", $('#feedback-form').serialize())
                .done(function (response) {
                    if(response.code === 200) {
                        if(!response.error) {
                            $('#feedback-form')[0].reset();
                            swal("Спасибо", "Спасибо за Ваше сообщение", "success");
                            $('.captcha').removeClass('error');
                            name.removeClass('js-valid');
                            text.removeClass('js-valid');
                            email.removeClass('js-valid');
                        } else {
                            $('.captcha').addClass('error');
                        }
                    } else {
                        swal("Ошибка!", response.message);
                    }
                    $(".captcha-img").attr("src", "/captcha.png?" + (new Date()).getTime());
                });
        }
    }
});

module.exports = AboutPageView;