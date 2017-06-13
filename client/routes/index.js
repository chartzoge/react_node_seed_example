"use strict";

import { HashRouter as Router, Route, Switch } from "react-router-dom";

import Config from "./config/config_route";

const App = () => {
    return (
        <div>
            <h1> Hello World! </h1>

            <div class="content-root">
                <Route path="/config" component={Config}/>
            </div>
        </div>
    );
};

export default () => (
    <Router basename={window.ENV.rootUri + "/"}>
        <Switch>
            <Route path="/" component={App} />
        </Switch>
    </Router>
);
