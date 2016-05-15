var Backbone = require("backbone");
var _ = require("underscore");
Backbone.$ = window.$;

var toursItemTmp = require("./templates/ToursItemTmp.hbs");
var swal = require("sweetalert");

var ToursItemView = Backbone.View.extend({
    tagName: "li",
    className: "tour-item",
    template: toursItemTmp,
    initialize: function (options) {
        _.bindAll(this, "deleteTour");

        this.router = options.router;
        this.$parentList = options.$parentList;
        this.tour = options.tour;

        this.$el.html(this.template(this.tour));
    },
    events: {
        "click .tour-delete": "deleteTour",
        "click .tour-edit": "editTour"
    },
    render: function () {
        this.$parentList.append(this.$el);
    },
    hide: function () {
        this.$el.hide();
    },
    show: function () {
        this.$el.show();
    },
    toggle: function () {
        this.$el.toggle();
    },
    deleteTour: function () {
        var that = this;
        swal({
            title: "Удалить тур",
            text: "Вы действительно хотите безворвзратно удалить тур?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Удалить",
            cancelButtonText: "Отмена",
            closeOnConfirm: true,
            closeOnCancel: true
        }, function () {
            $.get("/api/tours/remove/" + that.tour.id).done(function (response) {
                if (response.code === 200) {
                    that.$el.remove();
                } else {
                    swal("Ошибка", response.message);
                }
            });
        });
    },
    editTour: function () {
        this.router.navigate("/admin/tours/" + this.tour.id, {trigger: true});
    }
});

module.exports = ToursItemView;