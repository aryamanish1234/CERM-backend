const res = require('express/lib/response');
const User = require('../models/user.model');
const { userStatus } = require('../utils/constansts');
const obectConvertes = require("../utils/objectConverter");
/**
 * 
 */


/**
 * Fetch All List of All Users 
 *   Only ADMIN can  allowed to call this method 
 * -ADMIN should Filter 
 * 
 */

exports.findAllUsers = async(req, res) => {
    const mongoDBObj = {};
    nameReq = req.query.name;
    userStatusreq = req.query.userStatus;
    userTypeReq = req.query.userType;

    if (nameReq && userStatusreq && userTypeReq) {
        mongoDBObj.name = nameReq;
        mongoDBObj.userStatus = userStatusreq;
        mongoDBObj.userType = userTypeReq;
    } else if (nameReq && userStatusreq) {
        mongoDBObj.name = nameReq;
        mongoDBObj.userType = userStatusreq;
    } else if (nameReq && userTypeReq) {
        mongoDBObj.name = nameReq;
        mongoDBObj.userType = userTypeReq
    } else if (userStatusreq && userTypeReq) {
        mongoDBObj.userStatus = userStatusreq;
        mongoDBObj.userType = userTypeReq;
    } else if (nameReq) {
        mongoDBObj.name = nameReq;
    } else if (userStatusreq) {
        mongoDBObj.userStatus = userTypeReq
    } else if (userTypeReq) {
        mongoDBObj.userType = userTypeReq
    }


    try {
        console.log("Uses -> ", mongoDBObj);
        const UserDetails = await User.find(mongoDBObj);
        console.log(UserDetails)
        res.status(200).send(obectConvertes.userResponse(UserDetails));

    } catch (err) {
        console.log(err);
        res.status(400).json({
            message: "Invalid error while Fetch User Data  "
        })
    }
}


/**
 * finfd by ID 
 */

exports.findById = async(req, res) => {
    try {
        console.log(req.params.userId)
        const user = await User.find({ userId: req.params.userId })
        console.log(user);
        if (user.length > 0) {
            res.status(200).send(obectConvertes.userResponse(user))
            console.log("With userId")
        } else {
            //  console.log("Else part ")
            res.status(400).send({
                message: "User  with " + req.params.id + " dosen't exits "
            })
        }

    } catch (err) {
        console.log(err);
        res.status(401).json({
            message: err.message
        })
    }
}



/**
 * Update user Data 
 */

exports.UpdateUserData = (req, res) => {
    try {
        const user = User.findOneAndUpdate({
            userId: req.params.userId
        }, {
            name: req.body.name,
            userStatus: req.body.userStatus,
            userType: req.body.userType
        }).exec();
        res.status(200).json({
            message: "User Data is Updated "
        })
    } catch (err) {
        console.log(err);
        res.status(401).json({
            message: "Internal Server Error "
        })
    }
}