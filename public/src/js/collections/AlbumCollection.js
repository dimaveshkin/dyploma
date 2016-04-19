var Backbone = require("backbone");
var _ = require("underscore");
var AlbumModel = require("../models/AlbumModel");

var AlbumCollection = Backbone.Collection.extend({
    model: AlbumModel
});

module.exports = AlbumCollection;