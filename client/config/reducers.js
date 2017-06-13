"use strict";

import { RECIEVE_DATA } from "./actions";

const REDUCERS = {
    [RECIEVE_DATA]: (state, action) => {
        return Object.assign({}, state, {
            [action.modelName]: action.payload
        });
    }
};

const apiReducers = (state = {}, action) => {
    const { type } = action;

    if (REDUCERS[type]) {
        return REDUCERS[type](state, action);
    }

    return state;
};

export default apiReducers;
