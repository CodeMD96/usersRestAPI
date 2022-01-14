const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { trusted } = require("mongoose");
const User = require("../user/user.model");

exports.hashPassword = async (req, res, next) => {
    try {
        req.body.password = await bcrypt.hash(req.body.password, 8);
        next();
    } catch (error) {
        console.log(error);
        res.status(500).send({message: "Check server logs"});
    }
};

exports.tokenCheck = async (req, res, next) => {
    try {
        const token = req.header("Authorization").replace("Bearer ", "");
        const decodedToken = jwt.verify(token, process.env.SECRET);
        req.user = await User.findById(decodedToken._id);
        if (!req.user) {
            throw new Error("user not found");
        }
        next();
    } catch (error) {
        console.log(error);
        res.status(500).send({message: "Check server logs"});
    }
}