"use strict";

const MOCK_ENV_DATA = {
    user: "hello",
    rootUri: ""
};

module.exports = class RootController {
    index (req, res) {
        res.render("index", {
            data_block_env: JSON.stringify(MOCK_ENV_DATA)
        });
    }
};
