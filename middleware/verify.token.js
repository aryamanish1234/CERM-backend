const jwt = require('jsonwebtoken');
const secret = require('../configs/auth.config');
const User = require('../models/user.model');
const constant = require('../utils/constansts')
    /**
     * Verigy token 
     *
     */

exports.veriftToken = (req, res, next) => {
    const token = req.headers['token'];
    if (!token) {
        return res.status(403).send({
            message: " There will be No Token "
        })
    }

    jwt.verify(token, secret.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorthorized "
            })
        }
        req.userId = decoded.id;
        next();
    })
}

//console.log(veriftToken);

/**
 * Check that is Admin 
 */

exports.isAdmin = async(req, res, next) => {
    /**
     * Fetch user using UserId 
     */
    const user = await User.findOne({ userId: req.userId });
    console.log(user);

    if (user.userType === constant.userType.admin) {
        next();
    } else {
        return res.status(403).json({
            message: "ADMIN is Required"
        })
    }


}