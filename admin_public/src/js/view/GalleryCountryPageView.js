var Backbone = require("backbone");
Backbone.$ = window.$;
var _ = require("underscore");
var galleryPageTmp = require("./templates/GalleryCountryPageTmp.hbs");
var swal = require("sweetalert");

var GalleryPageView = Backbone.View.extend({
  el: ".dashboard",
  template: galleryPageTmp,
  initialize: function (options) {
    this.router = options.router;
    _.bindAll(this, "render", "addToBest");
  },
  events: {
    "click li .best-add": "addToBest",
    "click li .best-remove": "removeFromBest",
    "click li .remove-photo": "removePhoto"
  },
  render: function (countryName) {
    //$('.item-active').removeClass('item-active');
    //$('#nav-gallery').addClass('item-active');

    var that = this;
    //this.$el.removeClass("grey-background-after");

    $.get("/api/gallery/country/" + countryName, function (photos) {
      that.$el.html(that.template({photos: photos.list, countryName: photos.list[0].name}));

      $(".fancybox").fancybox({
        prevEffect: 'none',
        nextEffect: 'none',
        helpers: {
          title: {
            type: 'outside'
          }
        },
        beforeShow: function () {
          this.title = (this.title ? '' + this.title + '' : '') + ' <span class="num">' + (this.index + 1) + ' / ' + this.group.length + ' </span>';
        }
      });
    });
  },
  addToBest: function (e) {
    var id = $(e.target).closest('li').attr("data-photo-id");
    $.get("/api/gallery/best/add/" + id, function () {
      $(e.target).removeClass('icon-star-empty best-add').addClass('icon-star best-remove').attr('title', 'Удалить из избранного');
    });
    e.preventDefault();
    e.stopPropagation();
  },
  removeFromBest: function (e) {
    var id = $(e.target).closest('li').attr("data-photo-id");
    $.get("/api/gallery/best/remove/" + id, function () {
      $(e.target).removeClass('icon-star best-remove').addClass('icon-star-empty best-add ').attr('title', 'Добавить в избранное');
    });
    e.preventDefault();
    e.stopPropagation();
  },
  removePhoto: function (e) {
    var id = $(e.target).closest('li').attr("data-photo-id");
    swal({
      title: "Удалить фотографию",
      text: "Вы действительно хотите безворвзратно удалить фотографию?",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Удалить",
      cancelButtonText: "Отмена",
      closeOnConfirm: true,
      closeOnCancel: true
    }, function () {

      $.get("/api/gallery/photo/remove/" + id, function () {
        $(e.target).closest('li').remove();
      });
    });

    e.preventDefault();
    e.stopPropagation();
  }
});

module.exports = GalleryPageView;