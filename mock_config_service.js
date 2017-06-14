"use strict";

const express = require("express");
const app = express();

const MOCK_DATA = require("./server/utils/mock_data/mock_configuration");

app.get("/config", (req, res) => {
    res.json(MOCK_DATA);
});

app.listen("3001", () => global.console.log("Listening on 3001"));
