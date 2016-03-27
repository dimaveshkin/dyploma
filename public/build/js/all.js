(function (window) {

    var prevPic = $("#gallery-prev");
    var nextPic = $("#gallery-next");
    var gallery = $("#gallery");

    prevPic.on("click", function (e) {
        var prev = gallery.children(".active").removeClass("active").prev();

        if(prev.length === 0) {
            gallery.children().last().addClass("active");
        } else {
            prev.addClass("active");
        }
    });

    nextPic.on("click", function (e) {
        var next = gallery.children(".active").removeClass("active").next();

        if(next.length === 0) {
            gallery.children().first().addClass("active");
        } else {
            next.addClass("active");
        }
    });

})(window);