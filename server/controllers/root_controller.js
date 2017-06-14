"use strict";

const BaseController = require("./base_rest_controller");

const MOCK_ENV_DATA = {
    user: { name: "Leroy Jenkins" },
    rootUri: ""
};

module.exports = class RootController extends BaseController {
    index (req, res) {
        res.render("index", {
            data_block_env: JSON.stringify(MOCK_ENV_DATA)
        });
    }
};
