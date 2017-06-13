"use strict";

import ApiManager from "../managers/api_manager";

export const RECIEVE_DATA = "RECIEVE_DATA";
export const SEND_REQUEST = "SEND_REQUEST";

const ACTIONS = {
    CALL_API: () => {
        return {
            type: SEND_REQUEST
        };
    },
    API_RESPONSE: (modelName, payload) => {
        return {
            type: RECIEVE_DATA,
            modelName,
            payload
        };
    }
};

export default (options = {}) => {
    return {
        [`GET_${options.modelName}`](action) {
            return (dispatch) => {
                dispatch(ACTIONS.CALL_API());

                const apiManager = new ApiManager();

                return apiManager.get({
                    url: `${window.ENV.rootUri}/${options.modelName}`,
                    query: action.query
                })
                .then(data => {
                    return dispatch(ACTIONS.API_RESPONSE(options.modelName, data));
                })
                .catch(err => {
                    window.console.error(err);
                    throw err;
                });
            };
        }
    };
};
