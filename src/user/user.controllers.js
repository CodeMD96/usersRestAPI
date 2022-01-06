const User = require("./user.model");
const jwt = require("jsonwebtoken");

exports.addUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        const token = await user.generateAuthToken();
        res.status(201).send({message: "Success", user, token}); 
        //user on its own in the above object is the equivalent of user: user
    } catch (error) {
        console.log(error);
        res.status(500).send({message: "Check sever logs"});
    }
};

exports.listUser = async (req, res) => {
    try {
        const user = await User.findOne({username: req.params.username});
        res.status(200).send({mesage:"Sucess", user});
    } catch (error) {
        console.log(error);
        res.status(500).send({message: "Check server logs"});
    }
};

exports.updateUser = async (req, res) => {
    try {
        const user = await User.updateOne(req.body.updateKey, req.body.updateValue);
        res.status(201).send({message: "Success", user});
        
    } catch (error) {
        console.log(error);
        res.status(500).send({message: "Check server logs"});
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const user = await User.deleteOne({[req.params.deleteKey]: req.params.deleteValue})
        res.status(201).send({message: "Success", user});
    } catch (error) {
        console.log(error);
        res.status(500).send({message: "Check server logs"});
    }
};

exports.login = async (req, res) => {
    try {
        const token = await req.user.generateAuthToken();
        res.status(200).send({ user: req.user.username, token });
    } catch (error) {
        console.log(error);
        res.status(500).send({message: "Check server logs"});
    }
};

exports.tokenCheck = async (req, res) => {
    try {
        const token = req.header("Authorization").replace("Bearer ", "");
        const decodedToken = jwt.verify(token, process.env.SECRET);
        const user = await User.findById(decodedToken._id)
        res.status(200).send({user: user.username});
    } catch (error) {
        console.log(error);
        res.status(500).send({message: "Check server logs"});
    }
};

exports.cancelAccount = async (req, res) => {
    try {
        const token = req.header("Authorization").replace("Bearer ", "");
        const decodedToken = jwt.verify(token, process.env.SECRET);
        const user = await User.deleteOne({_id: decodedToken._id})
        res.status(200).send({ user});
    } catch (error) {
        console.log(error);
        res.status(500).send({message: "Check server logs"});
    }
};