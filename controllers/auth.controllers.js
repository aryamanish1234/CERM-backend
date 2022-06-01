const bcrypt = require("bcryptjs");
const { use } = require("express/lib/application");
const jwt = require("jsonwebtoken");
const constant = require("../utils/constansts");
const User = require("../models/user.model");
const secretkey = require("../configs/auth.config");






/**
 * For Regtration or singup 
 */

exports.signup = async(req, res) => {

    var userStatus = req.body.userStatus;
    console.log(userStatus);

    if (!userStatus) {
        if (!req.body.userType || req.body.userType == constant.userStatus.approved) {
            userStatus = constant.userStatus.approved;
        } else {
            userStatus = constant.userStatus.pending
        }
    }
    console.log(req.body.password);
    userData = {
        name: req.body.name,
        userId: req.body.userId,
        email: req.body.email,
        userType: req.body.userType,
        password: bcrypt.hashSync(req.body.password, 8),
        userStatus: userStatus

    }
    console.log(userData);
    try {
        const userCreate = await User.create(userData);
        console.log(userCreate);

        userResponse = {
            name: userCreate.name,
            email: userCreate.email,
            userStatus: userCreate.userStatus,
            userType: userCreate.userType,
            createdAt: userCreate.createdAt,
            updatedAt: userCreate.updatedAt
        }
        res.status(201).send(userResponse);
    } catch (err) {
        console.log("Somethings Wrong ");
        console.log(err);
        res.status(400).json({
            message: "Internal Error ",
            Err: err.message
        })

    }
}

/**
 * User Login 
 */
exports.signin = async(req, res) => {
    const user = await User.findOne({ userId: req.body.userId });
    console.log("User Details -> ", user);
    if (user == null) {
        return res.status(400).send({
            message: "Faild ! User id doesn't exist "
        })
    }
    // console.log(user.userStatus);
    // console.log(constant.userStatus.approved);
    // Check user is Approved 
    if (user.userStatus === constant.approved) {
        return res.status(200).send({
            message: "Can't allow this User Profile not approved !!"
        })
    }

    const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);

    if (!isPasswordValid) {
        return res.status(401).send({
            message: "Invalid Password "
        })
    }

    //Access Token 
    const token = jwt.sign({ id: user.userId }, secretkey.secret, {
        expiresIn: 3600
    })

    res.status(200).send({
        name: user.name,
        userId: user.userId,
        email: user.email,
        userType: user.userType,
        userStatus: user.userStatus,
        accessToken: token
    })
}