const express = require('express');
const router = express.Router();
const imageController = require('../controllers/imageController');
const authMiddleware = require("../middleware/auth.middleware");



router.post('/upload', authMiddleware
, imageController.uploadImage)
router.delete("/delete/:id", authMiddleware, imageController.deleteImage)
router.put("/update/:id", authMiddleware, imageController.updateImage)


module.exports = router;
