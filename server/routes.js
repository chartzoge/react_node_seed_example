"use strict";

module.exports = (app) => {
    const router = require("./utils/router")(app);

    router.install("/", require("./controllers/root_controller"));
    // router.install("/config", require("./controllers/config_controller"));
};
