const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({ name: { type: String, required: true}, description: {type: String}, path: {type: String, default: ""},
 size: {type: Number, default: 0}, 
 date: {type: Date, default: Date.now()}, category: {type: mongoose.ObjectId, ref: "category"}});

const Image = mongoose.model("image", imageSchema);

module.exports = Image;
