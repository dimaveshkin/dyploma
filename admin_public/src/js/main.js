var Backbone = require("backbone");
var $ = require("jquery");
Backbone.$ = $;

var Router = require("./routers/AppRouter");
require("./view/templates/helpers/helpers");

new Router();

Backbone.history.start({pushState: true});