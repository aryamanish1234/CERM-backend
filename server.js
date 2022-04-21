const express = require("express");
const serverConfig = require("./configs/server");
const mongoose = require("mongoose");
const dbConfig = require("./configs/db");
const bodyParser = require("body-parser");
const authrouter = require("./routes/auth.routee")
const EmailOTP = require("./controllers/test");
const app = express();





app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Setup the mongo DB
mongoose.connect(dbConfig.db_url, () => {
    console.log("MongoDB connected ");
})






app.post("/email", EmailOTP.regtration);
app.post("/login", EmailOTP.sign);
//app.use('/', authrouter);


app.listen(serverConfig.PORT, () => {
    console.log("server is running");

})