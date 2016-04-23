var Backbone = require("backbone");
Backbone.$ = window.$;
var feedbacksPageTmp = require("./templates/FeedbacksPageTmp.hbs");
var FeedbackPageView = require("./FeedbackPageView");

var FeedbacksPageView = Backbone.View.extend({
  el: ".dashboard",
  template: feedbacksPageTmp,
  initialize: function () {

  },
  render: function () {
    var self = this;
    self.$el.html(self.template());
    $.get('/api/feedback/', function (feedbacks) {
      for(var i = 0, length = feedbacks.length; i < length; i++) {
        console.log(feedbacks[i]);
        new FeedbackPageView(feedbacks[i]);
      }
    });
  }
});

module.exports = FeedbacksPageView;