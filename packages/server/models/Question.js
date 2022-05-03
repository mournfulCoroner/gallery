const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    name: { type: String }, email: { type: String }, text: { type: String }, unread: { type: Boolean, default: true }, date: { type: Date, default: Date.now() }
});

const Question = mongoose.model("question", questionSchema);

module.exports = Question;
