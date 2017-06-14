"use strict";

const ApiManager = require("./api_manager");
const nconf = require("../config");

const configMapper = require("../mappers/config_mapper");

module.exports = class ConfigManager {
    getAllConfig () {
        const apiManager = new ApiManager({
            baseUrl: nconf.get("api:configService:baseUrl"),
        });

        return apiManager.get({
            url: "/config"
        })
        .then((config) => configMapper.fromDB(config))
        .catch((err) => {
            global.console.error("Problem getting config", err);
            throw err;
        });
    }
};
