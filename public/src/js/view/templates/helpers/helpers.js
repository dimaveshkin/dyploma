var Handlebars = require("hbsfy/runtime");

Handlebars.registerHelper('getDate', function (start, end) {
    var date = new Date(start), day, month, year, startStr, endStr;

    day = date.getDate();
    month = date.getMonth() + 1;

    startStr = (day.toString() < 10 ? '0' : '') + day.toString() + "." + (month < 10 ? '0' : '') + month;

    date = new Date(end);

    day = date.getDate();
    month = date.getMonth() + 1;
    year = date.getFullYear();

    endStr = (day.toString() < 10 ? '0' : '') + day.toString() + "." + (month < 10 ? '0' : '') + month + year;

    return startStr + '-' + endStr;

});

Handlebars.registerHelper('isActiveTour', function(date, opt) {
   var startDate = new Date(date),
    now = new Date();

    if(startDate - now > 0) {
        return opt.fn(this);
    }

    return opt.inverse(this);
});
//
//Handlebars.registerHelper('isAdminOrUnitOwner', function(str, isUnitOwner, opt) {
//    if (str === roles.ADMIN || isUnitOwner) {
//        return opt.fn(this);
//    }
//    return opt.inverse(this);
//});


