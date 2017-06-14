"use strict";

const _ = require("lodash");

const CONTROLLER_METHODS = [
    { httpMethod: "get", name: "index", suffix: "" },
    { httpMethod: "get", name: "get", suffix: "/:id" },
    { httpMethod: "post", name: "create", suffix: "" },
    { httpMethod: "put", name: "update", suffix: "/:id" },
    { httpMethod: "delete", name: "delete", suffix: "/:id" }
];

module.exports = (app) => {
    return {
        install (baseUrl, Controller) {
            global.console.log(`Installing endpoint ${baseUrl}`);

            const controller = new Controller();

            CONTROLLER_METHODS.forEach(method => {
                if (!_.isFunction(controller[method.name])) {
                    global.console.log(`${Controller.name} has no method ${method.name} -- not implementing`);
                    return;
                }

                app[method.httpMethod](`${baseUrl}${method.suffix}`, controller[method.name]);
            });
        }
    };
};
