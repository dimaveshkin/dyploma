var Backbone = require("backbone");
Backbone.$ = window.$;
var _ = require("underscore");
var addPhotoPageTmp = require("./templates/NewPhotoPageTmp.hbs");
var fileUploadTmp = require("./templates/PhotUploadTpm.hbs");
var swal = require("sweetalert");
var GalleryPageView = Backbone.View.extend({
  el: ".dashboard",
  template: addPhotoPageTmp,
  initialize: function (options) {
    this.router = options.router;
    _.bindAll(this, "render");
  },
  render: function (countryId) {
    $('.active').removeClass('active');
    $('#categories').addClass('active');

    this.$el.html(this.template({countryId: countryId}));

    var that = this;
    $("#select-file").change(function () {
      for (var i = 0; i < this.files.length; i++) {
        var reader = new FileReader();

        reader.onload = function (event) {
          var the_url = event.target.result;
          $('.images-gallery').append(fileUploadTmp({src: the_url}));
          $('.select-label').addClass('js-hide');
          $('.upload').removeClass('js-hide');
        };

        reader.readAsDataURL(this.files[i]);
      }
    });

    $('#uploadForm').submit(function () {
      $('.spinner').removeClass('js-hide');

      $('.upload span').text('Загрузка');
      $(this).ajaxSubmit({
        success: function (response) {
          if(response.code !== 500) {
            swal("Загрузка завершена", "Фотографии успешно добавлены в альбом", "success");
            window.history.back();
          } else {
            swal("Ошибка!", response.message);
          }

        }
      });
      return false;
    });
  }
});

module.exports = GalleryPageView;