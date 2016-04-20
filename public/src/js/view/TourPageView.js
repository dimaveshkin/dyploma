var Backbone = require("backbone");
Backbone.$ = window.$;

var TourPageViewTmp = require("./templates/TourPageView.hbs");

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
  }
});

module.exports = TourPageView;