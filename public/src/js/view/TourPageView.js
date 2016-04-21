var Backbone = require("backbone");
Backbone.$ = window.$;
var swal = require("sweetalert");
var TourPageViewTmp = require("./templates/TourPageView.hbs");
var helpers = require('./templates/helpers/helpers');

var TourPageView = Backbone.View.extend({
  el: ".main",
  template: TourPageViewTmp,
  initialize: function () {

  },
  render: function (id){
    var that = this;
    this.$el.addClass("grey-background-after");

   $.get("/api/tours/" + id, function (tour) {
     console.log(tour);
     that.$el.html(that.template(tour[0]));
   });
  },
  events: {
    "submit #apply-form": "sendRequest"
  },
  sendRequest: function (e) {
    $.post("/api/tours/add", $('#apply-form').serialize())
        .done(function (data) {
          if (!data.error) {
            $(' #apply-form')[0].reset();
            swal("Спасибо", "Спасибо за Вашу заявку", "success");
          //  $('.captcha').removeClass('error');
          } else {
            swal("Спасибо", "Спасибо за Ваше сообщение", "error");
          //  $('.captcha').addClass('error');
          }
         // $(".captcha-img").attr("src", "/captcha.png?" + (new Date()).getTime());
        });
    e.preventDefault();
  }
});

module.exports = TourPageView;