const User = require("./user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.addUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        const token = jwt.sign({ _id: user._id }, process.env.SECRET);
        res.status(201).send({message: "Success", user, token}); 
        //user on its own in the above object is the equivalent of user: user
    } catch (error) {
        console.log(error);
        res.status(500).send({message: "Check sever logs"});
    };
};

exports.listUser = async (req, res) => {
    try {
        const user = await User.findOne({username: req.params.username});
        res.status(200).send({mesage:"Sucess", user});
    } catch (error) {
        console.log(error);
        res.status(500).send({message: "Check server logs"});
    };
};

exports.updateUser = async (req, res) => {
    try {
        const user = await User.updateOne({username: req.body.username}, {$set : {email: req.body.email}});
        res.status(201).send({message: "Success", user});
        
    } catch (error) {
        console.log(error);
        res.status(500).send({message: "Check server logs"});
    };
};

exports.deleteUser = async (req, res) => {
    try {
        const user = await User.deleteOne({username: req.params.username})
        res.status(201).send({message: "Success", user});
    } catch (error) {
        console.log(error);
        res.status(500).send({message: "Check server logs"});
    };
};

exports.login = async (req, res) => {
    try {
        if (req.user) {
            res.status(200).send({message: "Success", user: req.user });
        } else {
            const user = await User.findOne({username:req.body.username});
            if (await bcrypt.compare(req.body.password, user.password)) {
                const token = jwt.sign({ _id: user._id }, process.env.SECRET);
                res.status(200).send({user, token});
            } else {
                throw new Error("Password error");
            };
        };
    } catch (error) {
        console.log(error);
        res.status(500).send({message: "Check server logs"});
    };
};

exports.cancelAccount = async (req, res) => {
    try {
        const user = await User.findOne({username:req.body.username});
        if (await bcrypt.compare(req.body.password, user.password)) {
            const user = await User.deleteOne({username: req.body.username});
            res.status(200).send({message: "Success", user});
        } else {
            throw new Error("Password error");
        };
    } catch (error) {
        console.log(error);
        res.status(500).send({message: "Check server logs"});
    };
};