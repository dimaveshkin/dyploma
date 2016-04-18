const express = require('express');
var router = express.Router();
var galleryAPI = require('./gallery');
var socialsAPI = require('./socials');

router.use("/gallery", galleryAPI);
router.use("/socials", socialsAPI);

module.exports = router; 