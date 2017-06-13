"use strict";

import actions from "../config/actions";

export default class BaseModel {
    constructor (params) {
        this.modelName = params.modelName;
        this.actions = actions({
            modelName: this.modelName
        });
    }

    findAll(actionOptions) {
        return this.actions[`GET_${this.modelName}`](actionOptions);
    }
}
