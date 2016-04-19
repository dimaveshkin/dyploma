const express = require('express');
var router = express.Router();
var galleryAPI = require('./gallery');
var socialsAPI = require('./socials');
var feedbackAPI = require('./feedback');

router.use("/gallery", galleryAPI);
router.use("/socials", socialsAPI);
router.use("/feedback", feedbackAPI);

module.exports = router; 