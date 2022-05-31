/**
 * ValidTate the Request body 
 */
const User = require("../models/user.model");
validationSignUp = async(req, res, next) => {
    if (!req.body.name) {
        return res.status(400).send({
            message: "Failed ! User name is required"
        })
    }

    if (!req.body.userId) {
        return res.status(400).send({
            message: "Failed ! UserId is required "
        })
    }

    var user = await User.findOne({ userId: req.body.userId });

    if (user != null) {
        return res.status(400).send({
            message: "Failed ! UserId already exist  "
        })
    }

    if (!req.body.email) {
        return res.status(400).send({
            message: "Failed ! Email is Requied"
        })
    }

    var user = await User.findOne({ userId: req.body.email });

    if (user != null) {
        return res.status(400).send({
            message: "Failed ! Email is already exists "
        })
    }

    if (!req.body.password) {
        return res.status(400).send({
            message: "Failed ! Password is required"
        })
    }


    next();
}

module.exports = validationSignUp