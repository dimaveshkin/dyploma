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
  events: {
    //"click li .best-add": "addToBest",
    //"click li .best-remove": "removeFromBest",
    //"change #select-file": "showPhotos"
  },
  render: function (countryId) {
    this.$el.html(this.template({countryId: countryId}));

    var that = this;
    $("#select-file").change(function () {
      for (var i = 0; i < this.files.length; i++) {
        var reader = new FileReader();

        reader.onload = function (event) {
          var the_url = event.target.result;
          $('.images-gallery').append(fileUploadTmp({src: the_url}));
        };

        reader.readAsDataURL(this.files[i]);
      }

    });


    $('#uploadForm').submit(function () {
      $("#status").empty().text("File is uploading...");
      $(this).ajaxSubmit({

        error: function (xhr) {
          status('Error: ' + xhr.status);
        },

        success: function (response) {
          $("#status").empty().text(response);
          console.log(response);
        }
      });
      //Very important line, it disable the page refresh.
      return false;
    });
  }
});

module.exports = GalleryPageView;