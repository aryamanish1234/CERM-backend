const express = require("express")
const ticketControllers = require("../controllers/ticket.controllers");
const verify = require("../middleware/verify.token");


const router = express();


/**
 * tickets Router 
 */

router.post('/crm/api/v1/addticket', verify.veriftToken, ticketControllers.createticket);




module.exports = router;