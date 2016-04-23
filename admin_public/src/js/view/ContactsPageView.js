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
    var self = this;

    $.get('/api/socials', function (socials) {
      self.$el.html(self.template(socials[0]));
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
      success: function(data){
        if (!data.error) {
          swal("Сохраненно", "Данные успешно сохраненны", "success");
        }
         else {
          swal("Ошибка", data.error, "error");
        }
      }
    });
  }

});

module.exports = ContactsPageView;