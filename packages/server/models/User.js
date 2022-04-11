const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({nickname: {type: String, required: true, unique: true}, password: {type: String, required: true}, role: {type: String, required: true, default: "User"}}, {versionKey: false});

const User = mongoose.model("user", userSchema);

module.exports = User;
