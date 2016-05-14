var Backbone = require("backbone");
var transliteration = require('transliteration.cyr');
Backbone.$ = window.$;
var _ = require("underscore");
var newCategoryTmp = require("./templates/NewCategoryTmp.hbs");
//var helpers = require('./templates/helpers/helpers');
//var swal = require("sweetalert");

var NewCountryPageView = Backbone.View.extend({
  el: ".dashboard",
  template: newCategoryTmp,
  initialize: function (options) {
    this.router = options.router;
    _.bindAll(this, "render");
  },
  events: {
//    "click li .best-add": "addToBest",
//    "click li .best-remove": "removeFromBest",
//    "click li .remove-photo": "removePhoto",
//    "click li .do-cover": "doCover",
//    "click li .edit-desc": "editDesc",
//    "click .add-photo": "addPhoto"
  },
  render: function () {
    //$('.item-active').removeClass('item-active');
    //$('#nav-gallery').addClass('item-active');

    var that = this;
    that.$el.html(that.template());

    $('#new-city').submit(function () {
      $.post("/api/gallery/countries/add", $( "#new-city").serialize(), function () {

      });
      return false;
    });

    $('.country-name').keyup(function () {
      $('.country-international').val(transliteration.transliterate($(this).val()));
//      console.log(transliteration.transliterate($(this).val()));
    });

    //
//    $.get("/api/gallery/country/" + countryName, function (photos) {
//
//      $(".fancybox").fancybox({
//        prevEffect: 'none',
//        nextEffect: 'none',
//        helpers: {
//          title: {
//            type: 'outside'
//          }
//        },
//        beforeShow: function () {
//          this.title = (this.title ? '' + this.title + '' : '') + ' <span class="num">' + (this.index + 1) + ' / ' + this.group.length + ' </span>';
//        }
//      });
//    });
  }
});

module.exports = NewCountryPageView;