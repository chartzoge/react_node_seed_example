"use strict";

const _ = require("lodash");

const CONTROLLER_METHODS = [
    "index",
    "get",
    "create",
    "update",
    "delete"
];

module.exports = (app) => {
    return {
        install (baseUrl, Controller) {
            const controller = new Controller();

            CONTROLLER_METHODS.forEach(method => {
                if (!_.isFunction(controller[method])) {
                    global.console.log(`${Controller.name} has no method ${method} -- not implementing`);
                    return;
                }

                app.use(baseUrl, controller[method]);
            });
        }
    };
};
