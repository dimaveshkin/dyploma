var Backbone = require("backbone");
Backbone.$ = window.$;
var _ = require("underscore");
var addPhotoPageTmp = require("./templates/NewPhotoPageTmp.hbs");
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
    render: function () {
        this.$el.html(this.template());

var that = this;
        $("#select-file").change(function () {
            that.files = this.files;
            var file = this.files[0];
            var reader = new FileReader();

            // подстановка изображения в атрибут src
            reader.onload = function (event) {
                var the_url = event.target.result;
                //$('#some_container_div').html("<img src="" + the_url + "" alt="">")
                $('#image').attr('src', the_url);
            };

            // при считке файла, вызывается метод, описанный выше
            reader.readAsDataURL(file);
        });

        //
        //$("#upload-form").submit(function(event) {
        //
        //    event.stopPropagation(); // Stop stuff happening
        //    event.preventDefault(); // Totally stop stuff happening
        //
        //    // START A LOADING SPINNER HERE
        //
        //    // Create a formdata object and add the files
        //    var data = new FormData();
        //    $.each(that.files, function(key, value)
        //    {
        //        data.append(key, value);
        //    });
        //
        //    $.ajax({
        //        url: '/api/gallery/upload',
        //        type: 'POST',
        //        data: data,
        //        cache: false,
        //        dataType: 'json',
        //        processData: false, // Don't process the files
        //        contentType: false, // Set content type to false as jQuery will tell the server its a query string request
        //        success: function(data, textStatus, jqXHR)
        //        {
        //            if(typeof data.error === 'undefined')
        //            {
        //                // Success so call function to process the form
        //                submitForm(event, data);
        //            }
        //            else
        //            {
        //                // Handle errors here
        //                console.log('ERRORS: ' + data.error);
        //            }
        //        },
        //        error: function(jqXHR, textStatus, errorThrown)
        //        {
        //            // Handle errors here
        //            console.log('ERRORS: ' + textStatus);
        //            // STOP LOADING SPINNER
        //        }
        //    });
        //
        //
        //    ////action="/api/gallery/upload"
        //    ////var formData = new FormData($("#upload-form")[0]);
        //    //var formData = new FormData($("#upload-form")[0]);
        //    //
        //    //$.post($(this).attr("/api/gallery/upload"), formData, function(data) {
        //    //    alert(data);
        //    //});
        //    //
        //    //
        //    //e.preventDefault();
        //    //return false;
        //});
    }
    //showPhotos: function () {
    //    // генерация нового объекта FileReader
    //    var reader = new FileReader();
    //
    //    // подстановка изображения в атрибут src
    //    reader.onload = function (event) {
    //        var the_url = event.target.result;
    //        //$('#some_container_div').html("<img src="" + the_url + "" alt="">")
    //        $('#image').attr('src', the_url);
    //    };
    //
    //    // при считке файла, вызывается метод, описанный выше
    //    reader.readAsDataURL(file);
    //
    //}
});

module.exports = GalleryPageView;