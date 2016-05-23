var Backbone = require("backbone");
Backbone.$ = window.$;
var _ = require("underscore");
var swal = require("sweetalert");
var feedbacksPageTmp = require("./templates/FeedbacksPageTmp.hbs");
var nofeedbacksTmp = require("./templates/NoFeedbacksTmp.hbs");
var FeedbackPageView = require("./FeedbackPageView");

var FeedbacksPageView = Backbone.View.extend({
  el: ".dashboard",
  template: feedbacksPageTmp,
  initialize: function () {
    _.bindAll(this, "removeFeedback");
  },
  events: {
    "click tr .remove-feedback": "removeFeedback"
  },
  render: function () {
    $('.active').removeClass('active');
    $('#feedbacks').addClass('active');

    var self = this;
    self.$el.html(self.template());
    $.get('/api/feedback/', function (feedbacks) {
      if(response.code === 200) {
        if (feedbacks.length) {
          self.feedbacks = feedbacks;
          for (var i = 0, length = feedbacks.length; i < length; i++) {
            new FeedbackPageView(feedbacks[i]);
          }
        } else {
          self.$el.html(nofeedbacksTmp());
        }
      } else {
        swal("Ошибка!", response.message);
      }
    });
  },
  removeFeedback: function (e) {
    var id = $(e.target).attr("data-feedback-id");
    var self = this;
    $.ajax({
      url: '/api/feedback/' + id,
      type: 'DELETE',
      success: function (result) {
        if(response.code === 200) {
          $(e.target).closest('tr').remove();
          self.feedbacks = _.reject(self.feedbacks, function (d) {
            return d.id == id;
          });

          if (!self.feedbacks.length) {
            self.$el.html(nofeedbacksTmp());
          }
        } else {
          swal("Ошибка!", response.message);
        }
      }
    });
  }
});

module.exports = FeedbacksPageView;