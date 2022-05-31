/**
 * Authication Router 
 */
const express = require("express");
const app = express();
const authControlles = require("../controllers/auth.controllers");
const userControlles = require("../controllers/user.controllers");
const verifySign = require('../middleware')




app.post("/crm/api/v1/auth/signup", [verifySign.verifySignUp], authControlles.signup);
app.post("/crm/api/v1/auth/signin", authControlles.signin);
//app.get('/crm/api/users/all',  userControlles.findAllUsers);

module.exports = app;