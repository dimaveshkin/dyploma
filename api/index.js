const express = require('express');
var router = express.Router();
var galleryAPI = require('./gallery');
var socialsAPI = require('./socials');
var feedbackAPI = require('./feedback');
var toursAPI = require('./tours');

router.use("/gallery", galleryAPI);
router.use("/socials", socialsAPI);
router.use("/feedback", feedbackAPI);
router.use("/tours", toursAPI);

module.exports = router; 