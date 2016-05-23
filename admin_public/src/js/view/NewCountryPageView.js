var Backbone = require("backbone");
var transliteration = require('transliteration.cyr');
Backbone.$ = window.$;
var _ = require("underscore");
var newCategoryTmp = require("./templates/NewCategoryTmp.hbs");
var fileUploadTmp = require("./templates/PhotUploadTpm.hbs");
//var helpers = require('./templates/helpers/helpers');
//var swal = require("sweetalert");

var NewCountryPageView = Backbone.View.extend({
  el: ".dashboard",
  template: newCategoryTmp,
  initialize: function (options) {
    this.router = options.router;
    _.bindAll(this, "render");
  },
  render: function () {
    $('.active').removeClass('active');
    $('#categories').addClass('active');

    var that = this;
    that.$el.html(that.template());

    $('#new-city').submit(function () {

      $('.country-international, .country-name').removeClass('js-error');

      if ($.trim($('.country-name').val()) === '') {
        $('.country-name').addClass('js-error');
        return false;
      }

      if ($.trim($('.country-international').val()) === '') {
        $('.country-international').addClass('js-error');
        return false;
      }

      $('.spinner').removeClass('js-hide');

      $.post("/api/gallery/countries/add", $("#new-city").serialize(), function (response) {
        if (response.error) {
          swal("Ошибка", response.error);
        } else {
          if ($("#select-file").val() != '') {
            $('.country-id').val(response.id);
            $('#new-city').ajaxSubmit({
              success: function (response) {
                if(response.code !== 500) {
                  swal("Категория добавлена", "Категория успешно добавлена", "success");
                  that.router.navigate("admin/", {trigger: true});
                } else {
                  swal("Ошибка!", response.message);
                }
              }
            });
          } else {
            swal("Категория добавлена", "Категория успешно добавлена", "success");
            that.router.navigate("admin/", {trigger: true});
          }
        }
      });
      return false;
    });

    $('.country-name').keyup(function () {
      $('.country-international').val(transliteration.transliterate($(this).val()));
    });

    $("#select-file").change(function () {
      for (var i = 0; i < this.files.length; i++) {
        var reader = new FileReader();

        reader.onload = function (event) {
          var the_url = event.target.result;
          $('.images-gallery').append(fileUploadTmp({src: the_url}));
          $('.select-label').addClass('js-hide');
        };

        reader.readAsDataURL(this.files[i]);
      }
    });
  }
});

module.exports = NewCountryPageView;