const express = require('express');
const router = express.Router();
const { check } = require("express-validator");
const categotyController = require("../controllers/categoryController");
const authMiddleware = require("../middleware/auth.middleware");
const categoryController = require('../controllers/categoryController');


router.get('/get', categoryController.getCategory)

router.post('/create', authMiddleware, categotyController.createCategory)

module.exports = router;
