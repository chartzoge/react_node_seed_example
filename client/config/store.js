"use strict";

import thunkMiddleware from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import rootReducers from "./reducers";

export default createStore(rootReducers,
applyMiddleware(
    thunkMiddleware
));

