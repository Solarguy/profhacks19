const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const crypto = require("crypto");
const { Pool, Client } = require('pg')

const app = express();

global.routes = require('require-all')(path.join(__dirname, '/routes'));

const pool = new Pool();

global.pool = pool;
global.crypto = crypto;

app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "pug");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/assets/css", express.static(path.join(__dirname, "assets/css")));
app.use("/assets/fonts", express.static(path.join(__dirname, "assets/fonts")));
app.use("/assets/img", express.static(path.join(__dirname, "assets/img")));
app.use("/assets/js", express.static(path.join(__dirname, "assets/js")));

app.get("/", routes.home);
app.get("*", routes.page_not_found);

app.post("/mailbox", routes.mailbox);

const PORT = process.env.PORT;
app.listen(PORT);
