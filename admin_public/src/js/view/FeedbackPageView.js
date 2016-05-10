var Backbone = require("backbone");
Backbone.$ = window.$;
var _ = require("underscore");
var feedbackPageTmp = require("./templates/FeedbackPageTmp.hbs");
var helpers = require("./templates/helpers/helpers");

var FeedbackPageView = Backbone.View.extend({
  el: ".feedbacks-tbl",
  row: null,
  template: feedbackPageTmp,
  initialize: function (feedback) {
    _.bindAll(this, "render");
    this.id = feedback.id;
    this.render(feedback);

  },
  render: function (feedback) {
   this.el = this.$el.append(this.template(feedback));
  }

});

module.exports = FeedbackPageView;