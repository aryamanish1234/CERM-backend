const express = require("express");
const serverConfig = require("./configs/server");
const mongoose = require("mongoose");
const dbConfig = require("./configs/db");
const bodyParser = require("body-parser");
const authrouter = require("./routes/auth.routee");
const userRouter = require('./routes/user.routes');
const ticketRouter = require("./routes/ticket.router");
const app = express();





app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Setup the mongo DB
mongoose.connect(dbConfig.db_url, () => {
    console.log("MongoDB connected ");
})





app.use('/', authrouter);
app.use('/', userRouter);
app.use('/', ticketRouter)



app.listen(serverConfig.PORT, () => {
    console.log("server is running");

})