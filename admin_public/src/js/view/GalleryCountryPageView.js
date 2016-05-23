var Backbone = require("backbone");
Backbone.$ = window.$;
var _ = require("underscore");
var galleryPageTmp = require("./templates/GalleryCountryPageTmp.hbs");
var helpers = require('./templates/helpers/helpers');
var swal = require("sweetalert");

var GalleryPageView = Backbone.View.extend({
  el: ".dashboard",
  template: galleryPageTmp,
  initialize: function (options) {
    this.router = options.router;
    _.bindAll(this, "render", "addToBest", "addPhoto", "doCover");
  },
  events: {
    "click li .best-add": "addToBest",
    "click li .best-remove": "removeFromBest",
    "click li .remove-photo": "removePhoto",
    "click li .do-cover": "doCover",
    "click .add-photo": "addPhoto"
  },
  render: function (countryName) {
    $('.active').removeClass('active');
    $('#categories').addClass('active');

    var that = this;

    $.get("/api/gallery/country/" + countryName, function (photos) {
      if(photos.code == 500) {
        swal("Ошибка", photos.error);
        return;
      }
      that.$el.html(that.template({photos: photos.list, countryName: photos.name, id: photos.id, catCover: photos.cover}));
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

      $('.edit-desc').on('click', function (e) {
        var root = $(e.target).closest('li');

        if(root.find('.photo-desc').hasClass('js-hide')) {
          root.find('.photo-desc').removeClass('js-hide');
          root.find('.edit-desc').removeClass('icon-edit').addClass('icon-cancel-circled').attr('title', 'Отмена');
        } else {
          root.find('.edit-desc').addClass('icon-edit').removeClass('icon-cancel-circled').attr('title', 'Редактировать описание');
          root.find('.photo-desc').addClass('js-hide');
        }
      });

      $('.save-desc').on('click', function (e) {
        var root = $(e.target).closest('li');

        var title = root.find('.photo-title').val();
        var desc = root.find('.desc-area').val();
        var fullText = "";
        if(title != '') {
          fullText = "<b>" + title + "</b><br/>"
        }

        if(desc != '') {
          fullText += desc + "<br/>"
        }
        $.ajax({
          method: "PUT",
          url: "/api/gallery/photo/update/" + root.attr('data-photo-id'),
          data: { title: title, desc: desc }
        })
        .done(function(response) {
              if (response.code === 200) {
                root.find('.link-block').attr('title', fullText).attr('org_title', fullText);
                root.find('.photo-desc').addClass('js-hide').attr('title', 'Редактировать описание');
                root.find('.photo-desc').prev('.edit-desc').addClass('icon-edit').removeClass('icon-cancel-circled');
              } else {
                swal("Ошибка", response.error);
              }
        });
      });
    });
  },
  addToBest: function (e) {
    var id = $(e.target).closest('li').attr("data-photo-id");
    $.get("/api/gallery/best/add/" + id, function (response) {
      if(response.code === 200) {
        $(e.target).removeClass('icon-star-empty best-add').addClass('icon-star best-remove').attr('title', 'Удалить из избранного');
      } else {
        swal("Ошибка", response.message);
      }
    });
  },
  removeFromBest: function (e) {
    var id = $(e.target).closest('li').attr("data-photo-id");
    $.get("/api/gallery/best/remove/" + id, function (response) {
      if(response.code === 200) {
        $(e.target).removeClass('icon-star best-remove').addClass('icon-star-empty best-add ').attr('title', 'Добавить в избранное');
      } else {
          swal("Ошибка", response.message);
      }
    });
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
        if (response.code === 200) {
          $(e.target).closest('li').remove();
        } else {
          swal("Ошибка", response.error);
        }

      });
    });
  },
  addPhoto: function () {
    this.router.navigate("/admin/categories/" + this.countryId + "/add", {trigger: true});
  },
  doCover: function (e) {
    var id = $(e.target).closest('li').attr("data-photo-id");
    var countryId = $(e.target).attr("data-city-id");
    swal({
      title: "Сменить обложку",
      text: "Вы действительно хотите сменить обложку альбома?",
      type: "info",
      showCancelButton: true,
      confirmButtonColor: "#8CD4F5",
      confirmButtonText: "OK",
      cancelButtonText: "Отмена",
      closeOnConfirm: true,
      closeOnCancel: true
    }, function () {

      $.get("/api/gallery/cover/" + countryId + "/" + id, function (response) {
        if (response.error) {
          swal("Ошибка!", response.error);
        } else {
          $('.is-cover').removeClass('is-cover').addClass('do-cover').attr('title', 'Сделать обложкой альбома');

          $(e.target).removeClass('do-cover').addClass('is-cover').attr('title', 'Текущая обложка альбома');
        }
      });
    });
  }
});

module.exports = GalleryPageView;