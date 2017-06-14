"use strict";

const nconf = require("nconf");

nconf.use("memory");
nconf.env("__").argv();

const customConfig = nconf.get("properties:named");

if (customConfig) {
    global.console.log("Loading custom nconf config file", customConfig);
    nconf.add("supplied", { type: "file", file: require.resolve(`./config-${customConfig}`) });
}

nconf.file(require.resolve("./defaults.json"));

module.exports = nconf;
