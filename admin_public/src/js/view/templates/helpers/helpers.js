var Handlebars = require("hbsfy/runtime");

Handlebars.registerHelper('getDateTime', function (date) {
  var datetime = new Date(date), day, month, year, hour, minutes;

  day = datetime.getDate();
  month = datetime.getMonth() + 1;
  year = datetime.getFullYear();
  hour = datetime.getHours();
  minutes = datetime.getMinutes();

  return (day.toString() < 10 ? '0' : '') + day.toString() + "." + (month < 10 ? '0' : '') + month + "." + year + " " + (hour < 10 ? '0' : '') + hour + ":" + (minutes < 10 ? '0' : '') + minutes;
});

Handlebars.registerHelper('getDate', function (start, end) {
  var date = new Date(start), day, month, year, startStr, endStr;

  day = date.getDate();
  month = date.getMonth() + 1;

  startStr = (day.toString() < 10 ? '0' : '') + day.toString() + "." + (month < 10 ? '0' : '') + month;

  date = new Date(end);

  day = date.getDate();
  month = date.getMonth() + 1;
  year = date.getFullYear();

  endStr = (day.toString() < 10 ? '0' : '') + day.toString() + "." + (month < 10 ? '0' : '') + month + '.' + year;

  return startStr + '-' + endStr;

});



Handlebars.registerHelper('if_eq', function(a, b, opts) {
  if(a == b) // Or === depending on your needs
    return opts.fn(this);
  else
    return opts.inverse(this);
});