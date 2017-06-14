"use strict";

const Promise = require("bluebird");
const request = require("request");

module.exports = class ApiManager {
    constructor (params) {
        this.baseUrl = params.baseUrl;
    }

    _makeApiRequest(params) {
        return new Promise((resolve, reject) => {
            request({
                method: params.method,
                url: `${this.baseUrl}${params.url}`,
                body: params.body
            }, (err, httpResponse, body) => {
                if (err) {
                    global.console.error(err);
                    return reject(err);
                }

                resolve(JSON.parse(body));
            });
        });
    }

    get (params) {
        params.method = "GET";
        return this._makeApiRequest(params);
    }
};
