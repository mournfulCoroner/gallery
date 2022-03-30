const Post = require('../models/Post');

async function findAll() {
    return await Post.find({}).exec();
}

module.exports = {
    findAll,
};
