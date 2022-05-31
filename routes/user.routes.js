const express = require("express");
const router = express();
const userControlles = require("../controllers/user.controllers");
const verify = require('../middleware/index');

/**
 * 
 * User API 
 */

router.get('/crm/api/v1/users/all', [verify.authjwt.veriftToken, verify.authjwt.isAdmin], userControlles.findAllUsers);
router.get('/crm/api/v1/users/:userId', [verify.authjwt.veriftToken], userControlles.findById);
router.put("/crm/api/v1/users/:userId", [verify.authjwt.veriftToken, verify.authjwt.isAdmin], userControlles.UpdateUserData);




module.exports = router;