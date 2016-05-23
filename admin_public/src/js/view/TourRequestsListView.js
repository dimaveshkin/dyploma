var Backbone = require("backbone");
Backbone.$ = window.$;
var _ = require("underscore");
var TourRequestListTmp = require("./templates/TourRequestListTmp.hbs");
var helpers = require("./templates/helpers/helpers");

var TourRequestListView = Backbone.View.extend({
    el: ".dashboard",
    template: TourRequestListTmp,
    initialize: function (options) {
        this.router = options.router;
        _.bindAll(this, "render", "deleteRequest");
    },
    events: {
        "click .request-accept": "acceptRequest",
        "click .request-reject": "rejectRequest",
        "click .request-delete": "deleteRequest"
    },
    render: function (id) {
        $('.active').removeClass('active');
        $('#requests').addClass('active');

        var that = this;

        $.get('/api/tours/requests/' + id , function (requests) {
            if(requests.code !== 500) {
                that.requests = requests;
                that.$el.html(that.template({requests: requests}));
            } else {
                swal("Ошибка", response.message);
            }
        });
    },
    acceptRequest: function(e) {
        var root = $(e.target).closest('tr');

        $.post("/api/tours/requests/accept/" + root.attr('data-request-id'), function (response) {
            if (response.error) {
                swal("Ошибка", response.error);
            } else {
                root.find('.status').text('Принятая');
                root.removeClass();
                root.addClass('accepted-request');
                $(e.target).closest('td').html('<i class="icon-thumbs-down request-reject" title="Отклонить заявку"></i>');
            }
        });
    },
    rejectRequest: function(e) {
        var root = $(e.target).closest('tr');

        $.post("/api/tours/requests/reject/" + root.attr('data-request-id'), function (response) {
            if (response.error) {
                swal("Ошибка", response.error);
            } else {
                root.find('.status').text('Отклоненная');
                root.removeClass();
                root.addClass('rejected-request');
                $(e.target).closest('td').html('<i class="icon-thumbs-up request-accept" title="Принять заявку"></i><i class="icon-cancel request-delete" title="Удалить заявку"></i>');
            }
        });
    },
    deleteRequest: function(e) {
        var root = $(e.target).closest('tr');
        var that = this;
        var id = root.attr('data-request-id');
        $.post("/api/tours/requests/delete/" + id, function (response) {
            if (response.error) {
                swal("Ошибка", response.error);
            } else {
                root.remove();

                that.requests = _.reject(that.requests, function (d) {
                    return d.id == id;
                });

                if (!that.requests.length) {
                    window.history.back();
                }
            }
        });
    }
});

module.exports = TourRequestListView;