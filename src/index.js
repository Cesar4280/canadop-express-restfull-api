// environment
if (process.env.NODE_ENV !== "production") require("dotenv").config();

// importing modules
const cors = require("cors");
const routes = require("./routes");
const config = require("./settings/server");
const express = require("express");

// application
const app = express();

// disables
app.disable("x-powered-by");

// settings
app.set("host", config.host);
app.set("port", config.port);

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// route implementations
app.use("/api", routes);

// starting the server
app.listen(app.get("port"), app.get("host"), () => console.log("running..."));