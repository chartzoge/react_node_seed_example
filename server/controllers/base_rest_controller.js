"use strict";

const handleNotImplemented = (req, res) => {
    const message = `Endpoint: ${req.url} does not have method: ${req.method}`;
    global.console.error(message);
    res.status(501).json({ err: message });
};

module.exports = class BaseRestController {
    index (req, res) {
        handleNotImplemented(req, res);
    }

    get (req, res) {
        handleNotImplemented(req, res);
    }

    create (req, res) {
        handleNotImplemented(req, res);
    }

    update (req, res) {
        handleNotImplemented(req, res);
    }

    delete (req, res) {
        handleNotImplemented(req, res);
    }
};
