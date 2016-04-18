var Backbone = require("backbone");
var $ = require("jquery");
Backbone.$ = $;

var Router = require("./routers/AppRouter");



new Router();

Backbone.history.start({pushState: true});