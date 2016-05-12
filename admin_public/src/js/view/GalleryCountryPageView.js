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
    _.bindAll(this, "render", "addToBest", "addPhoto");
  },
  events: {
    "click li .best-add": "addToBest",
    "click li .best-remove": "removeFromBest",
    "click li .remove-photo": "removePhoto",
    "click .add-photo": "addPhoto"
  },
  render: function (countryName) {
    //$('.item-active').removeClass('item-active');
    //$('#nav-gallery').addClass('item-active');

    var that = this;

    $.get("/api/gallery/country/" + countryName, function (photos) {
      that.$el.html(that.template({photos: photos.list, countryName: photos.list[0].name, id: photos.id}));
      that.countryId = photos.id;
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

      $.get("/api/gallery/photo/remove/" + id, function (response) {
        if(response.code === 200) {
          $(e.target).closest('li').remove();
        } else {
          swal("Ошибка", response.error);
        }

      });
    });

    e.preventDefault();
    e.stopPropagation();
  },
  addPhoto: function () {
    this.router.navigate("/admin/categories/" + this.countryId + "/add", {trigger: true});
  }
});

module.exports = GalleryPageView;