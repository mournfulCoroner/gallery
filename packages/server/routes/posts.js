const express = require('express');
const router = express.Router();

const postsQuery = require('../db/query/post');

/* GET posts */
router.get('/', async function (req, res, next) {
    const posts = await postsQuery.findAll();

    res.send(posts);
});

module.exports = router;
