var Backbone = require("backbone");
Backbone.$ = window.$;
var swal = require("sweetalert");
var TourPageViewTmp = require("./templates/TourPageView.hbs");
var helpers = require('./templates/helpers/helpers');
var validator = require("./templates/helpers/validator");

var TourPageView = Backbone.View.extend({
    el: ".main",
    template: TourPageViewTmp,
    id: null,
    initialize: function () {

    },
    render: function (id) {
        $('.item-active').removeClass('item-active');
        $('#nav-tours').addClass('item-active');
        var that = this;
        this.id = id;
        this.$el.addClass("grey-background-after");

        $.get("/api/tours/" + id, function (tour) {
          that.$el.html(that.template(tour[0]));

          $(".fancybox").fancybox({
            prevEffect	: 'none',
            nextEffect	: 'none',
            helpers	: {
              title	: {
                type: 'outside'
              }
            },
            beforeShow : function() {
              this.title = (this.index + 1) + ' / ' + this.group.length + ' </span>';
            }
          });
        });
    },
    events: {
        "submit #apply-form": "sendRequest"
    },
    sendRequest: function (e) {
        e.preventDefault();
        var name = $('#name'),
            email = $('#email'),
            text = $('#application'),
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
            $.post("/api/tours/add", ($('#apply-form').serialize() + '&tour_id=' + this.id))
                .done(function (data) {
                    if (!data.error) {
                        $(' #apply-form')[0].reset();
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

module.exports = TourPageView;