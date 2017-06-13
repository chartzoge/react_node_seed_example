"use strict";

import $ from "jQuery";
import Promise from "bluebird";
import queryString from "query-string";

export default class ApiManager {
    _makeRequest (params) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: params.url,
                method: params.method,
                data: params.query || params.body
            })
            .done((responseBody) => {
                resolve(responseBody);
            })
            .fail((xhr, status, err) => {
                reject(err);
            });
        });
    }

    get (params) {
        params.method = "GET";
        return this._makeRequest(params);
    }

    static get (params) {
        return (new ApiManager(params)).get(params);
    }

    static getQueryParam(queryParam) {
        const href = window.location.href.split("?");
        const queries = href.length > 1 ? href[1] : "";
        const queryFromUrl = window.location.search || queries;

        const params = queryString.parse(queryFromUrl);
        return params[queryParam] || "";
    }
}
