const mongoose = require('mongoose');
const constant = require('../utils/constansts');





const ticketSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    desc: {
        type: String,
        required: true
    },
    ticketPrority: {
        type: Number,
        required: true,
        default: constant.ticketPrority.one
    },
    Status: {
        type: String,
        required: true,
        default: constant.ticketStatuas.open
    },
    reporter: {
        type: String,
    },
    assignee: {
        type: String
    },

    createdAt: {
        type: Date,
        immutable: true,
        default: () => {
            return Date.now();
        }
    },
    updatedAt: {
        type: Date,
        immutable: true,
        default: () => {
            return Date.now();
        }
    }



})


module.exports = mongoose.model("ticket", ticketSchema);