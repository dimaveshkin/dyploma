var Backbone = require("backbone");

var SocialsModel = Backbone.Model.extend({
  defaults: {
    email: null,
    googlePlus: null,
    instagram: null,
    pinterest: null,
    vkontakte: null,
    facebook: null,
    twitter: null
  },
  urlRoot : '/api/socials/'
});

module.exports = SocialsModel;
