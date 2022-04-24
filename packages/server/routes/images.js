const express = require('express');
const router = express.Router();
const imageController = require('../controllers/imageController');
const authMiddleware = require("../middleware/auth.middleware");



router.post('/upload', authMiddleware
, imageController.uploadImage)


module.exports = router;
