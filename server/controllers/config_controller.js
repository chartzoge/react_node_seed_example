"use strict";

const BaseController = require("./base_rest_controller");
const ConfigManager = require("../managers/config_manager");

module.exports = class ConfigController extends BaseController {
    index (req, res) {
        const configManager = new ConfigManager();

        configManager.getAllConfig()
        .then((config) => {
            res.json({
                configurations: config
            });
        })
        .catch((err) => {
            global.console.error("Problem getting config", err);

            res.status(500).json({
                err: err.message,
                stack: err.stack
            });
        });
    }
};
