var Backbone = require("backbone");
Backbone.$ = window.$;
var swal = require("sweetalert");
var mainPageTmp = require("./templates/ContactsPageTpm.hbs");

var ContactsPageView = Backbone.View.extend({
  el: ".dashboard",
  template: mainPageTmp,
  initialize: function () {

  },
  render: function () {

    $('.active').removeClass('active');
    $('#contacts').addClass('active');

    var self = this;

    $.get('/api/socials', function (socials) {
      if(socials.code === 500) {
        swal("Ошибка!", socials.message);
      } else {
        self.$el.html(self.template(socials[0]));
      }
    });
  },
  events: {
    "submit #contacts-frm": "saveContacts"
  },
  saveContacts: function (e) {
    e.preventDefault();

    $.ajax({
      type: "PUT",
      url: "/api/socials/",
      data: $('#contacts-frm').serialize(),
      success: function(response){
        if(response.code !== 200) {
          swal("Сохраненно", "Данные успешно сохраненны", "success");
        }
         else {
          swal("Ошибка", response.message);
        }
      }
    });
  }

});

module.exports = ContactsPageView;