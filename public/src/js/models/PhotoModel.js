var Backbone = require("backbone");
var _ = require("underscore");


var PhotoModel = Backbone.Model.extend({
    defaults: {
        id: "",
        src: "",
        title: "",
        desc: ""
    }
});

module.exports = PhotoModel;