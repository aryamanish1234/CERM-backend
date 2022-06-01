const Ticket = require('../models/ticket.model');
const obectConvertes = require("../utils/objectConverter");
const User = require("../models/user.model");
const constansts = require('../utils/constansts');
const { userStatus } = require('../utils/constansts');

/**
 * Crate Ticket 
 */

exports.createticket = async(req, res) => {
    const ticketData = {
        title: req.body.title,
        desc: req.body.desc,
        ticketPrority: req.body.ticketPrority
    }

    /**
     * If Engineer is available 
     */

    const engineer = await User.findOne({
        userType: constansts.userType.engineer,
        userStatus: constansts.userStatus.approved
    })
    console.log(engineer);
    console.log(engineer.userId)
    ticketData.assignee = engineer.userId;


    console.log(ticketData)
    try {
        const createdData = await Ticket.create(ticketData);
        console.log(createdData);
        res.status(200).send(obectConvertes.ticketRespones(createdData));
    } catch (err) {
        console.log(err);
        res.status(400).json({
            Error: err.message,
            message: "Internal server error "
        })
    }


}