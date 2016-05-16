var Backbone = require("backbone");
Backbone.$ = window.$;
var swal = require("sweetalert");
var mainPageTmp = require("./templates/ChangePassTmp.hbs");

var ChangePassPageView = Backbone.View.extend({
  el: ".dashboard",
  template: mainPageTmp,
  initialize: function () {

  },
  render: function () {
    $('.active').removeClass('active');
    $('#password').addClass('active');
    this.$el.html(this.template());
  },
  events: {
    "submit #pass-frm": "changePassword"
  },
  changePassword: function (e) {
    e.preventDefault();
     if($('#passwordNew').val() == $('#repeat').val()) {
      $.post("/api/password/change", $('#pass-frm').serialize())
          .done(function (data) {
            if (!data.error) {
              swal("Сохраненно", "Пароль успешно сохранен", "success");
            }
            else {
              swal("Ошибка", data.error, "error");
            }
          });
    } else {
      swal("Ошибка", "Пароли не совпадают", "error");
    }

  }
});

module.exports = ChangePassPageView;