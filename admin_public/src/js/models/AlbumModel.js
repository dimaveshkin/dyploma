var Backbone = require("backbone");
var _ = require("underscore");


var AlbumModel = Backbone.Model.extend({
    defaults: {
        id: "",
        name: "",
        international: "",
        cover: ""
    }
});

module.exports = AlbumModel;