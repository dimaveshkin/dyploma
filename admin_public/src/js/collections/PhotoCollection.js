var Backbone = require("backbone");
var _ = require("underscore");
var PhotoModel = require("../models/PhotoModel");

var PhotoCollection = Backbone.Collection.extend({
    model: PhotoModel
});

module.exports = PhotoCollection;