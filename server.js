"use strict";

const express = require("express");
const path = require("path");
const app = express();

app.use(express.static(process.cwd()));
app.set("views", path.join(__dirname, "server/views"));
app.set("view engine", "pug");

require("./server/routes")(app);

app.listen("3000", () => global.console.log("Listening on 3000"));
