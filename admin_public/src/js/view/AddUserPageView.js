var Backbone = require("backbone");
Backbone.$ = window.$;
var swal = require("sweetalert");
var addUserTmp = require("./templates/AddUserTmp.hbs");

var AddUserPageView = Backbone.View.extend({
    el: ".dashboard",
    template: addUserTmp,
    initialize: function () {

    },
    render: function () {
        $('.active').removeClass('active');
        $('#new-admin').addClass('active');
        this.$el.html(this.template());
    },
    events: {
        "submit #adduser-frm": "addUser"
    },
    addUser: function (e) {
        e.preventDefault();

        if($.trim($('#passwordNew').val()) === ""){
            swal("Ошибка", "Нужно ввести пароль.", "error");
            return;
        }

        if($.trim($('#login').val()) === ""){
            swal("Ошибка", "Нужно ввести имя пользователя.", "error");
            return;
        }

        if ($('#passwordNew').val() == $('#repeat').val()) {
            $.post("/api/password/add", $('#adduser-frm').serialize())
                .done(function (data) {
                    if (data.code === 200) {
                        swal("Сохраненно", "Пользователь успешно добавлен", "success");
                    }
                    else {
                        swal("Ошибка", data.message, "error");
                    }
                });
        } else {
            swal("Ошибка", "Пароли не совпадают", "error");
        }

    }
});

module.exports = AddUserPageView;