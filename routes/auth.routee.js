/**
 * Authication Router 
 */
const express = require("express");

const authControlles = require("../controllers/auth.controllers");

module.exports = (app) => {

    //  Ragtration Data 
    app.post("crm/api/v1/auth/signup", authControlles.signup);

    // Login User 
    app.post("crm/api/v1/auth/signin", authControlles.signin);

    app.post("/email", EmailOTP.regtration);
}