const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

userSchema.methods.generateAuthToken = function () {
    return jwt.sign({_id: this._id}, process.env.SECRET)
    // sign method creates a token, takes 2 args
};

const User = mongoose.model("User", userSchema);

module.exports = User;