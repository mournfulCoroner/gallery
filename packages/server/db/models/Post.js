const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({title: String, body: String}, {versionKey: false});

const Post = mongoose.model("posts", postSchema);

module.exports = Post;
